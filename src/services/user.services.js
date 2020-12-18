import auth from '../auth/auth'
import { COLLECTIONS_URL } from '../utils/config.url'
import cookies from '../utils/cookie'
import axios from 'axios'
import download from 'downloadjs'
import JSZIP from 'jszip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver';


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const downloadImageByUrl = async (url, callback) => {
    const result = await auth.verifyAccessToken();
    const name = "image.jpg"
    if (result === true) {
        let x = new XMLHttpRequest();
        x.open("GET", url, true);
        x.responseType = 'blob';
        x.onload = function (e) { download(x.response, name, "image/jpg"); }
        x.send();
    }
    else {
        callback && callback();
    }
}

export const downloadMultiImagesByUrls = async (listImage, callback) => {
    const result = await auth.verifyAccessToken();
    const name = "image.jpg"
    if (result === true) {
        for (const element of listImage) {
            let x = new XMLHttpRequest();
            x.open("GET", element.url, true);
            await sleep(1000);
            x.responseType = 'blob';
            x.onload = function (e) { download(x.response, name, "image/jpg"); }
            x.send();
        };
    }
    else {
        callback && callback();
    }
}

export const downloadMultiImagesByUrlsVers2 = async (listImage, callback) => {
    const zip = new JSZIP();

    const result = await auth.verifyAccessToken();
    if (result === true) {
        const folder = zip.folder("Downloaded-Image-From-InstaDown")
        let count = 0;

        for( const [idx, el] of listImage.entries()) {
            // loading a file and add it in a zip file
            // eslint-disable-next-line
            JSZipUtils.getBinaryContent(el.url, (err, data) =>{
                let filename = `image-${idx}.jpg`;
                if (err) {
                    throw err; // or handle the error
                }
                folder.file(filename, data, { binary: true });
                count++; // eslint-no-loop-func
                // NOTE Need to figure out if count can be less then length or not?
                if (count === listImage.length) {    
                zip.generateAsync({ type: 'blob' }).then(function (content) {
                        saveAs(content, "FromInstaDownWithLove.zip");
                    });
                }
            });
        };
    }
    else {
        callback && callback();
    }
}

const handleAddToCollection = async (url, thumbnail, type, platform, id, source) => {
    const accessToken = cookies.get("accessToken");

    const data = {
        "url": url,
        "thumbnail": thumbnail,
        "type": type,
        "platform": platform,
        "id": id,
        "source": source
    };

    let config = {
        method: 'post',
        url: "temp",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${accessToken}`
        },
        data: JSON.stringify(data)
    };

    axios.request(config)
        .then(response => response.data)
        .then(data => {
            if (data && data['message'] === 'Success') {
                alert("Added to collection");
            }
        })
        .catch(error => {
            console.log("Error occurred when trying to add to collection.");
            if (error.response) {
                alert(error.response.data.message);
            }
            else {
                alert("Something went wrong. Please check your internet connection.");
            }
        })
}

export async function addToCollection(url, thumbnail, type, platform, id, source, callback) {
    const verifyProcess = await auth.verifyAccessToken();

    if (verifyProcess) {
        handleAddToCollection(url, thumbnail, type, platform, id, source);
    }
    else {
        callback();
    }
};

const handleCreateCollection = (name)=>{
    const accessToken = cookies.get("accessToken");

    const data = {
        name: name
    };

    let config = {
        method: 'POST',
        url: COLLECTIONS_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${accessToken}`
        },
        data: JSON.stringify(data)
    };

    axios.request(config)
        .then(response => response.data)
        .then(data => {
            if (data && data['message'] === 'Success') {
                alert("Created to collection");
            }
        })
        .catch(error => {
            console.log("Error occurred when trying to create collection.");
            if (error.response) {
                alert(error.response.data.message);
            }
            else {
                alert("Something went wrong. Please check your internet connection.");
            }
        })
};

export async function createCollection(nameCollection, callback) {
    const verifyProcess = await auth.verifyAccessToken();

    if (verifyProcess) {
        handleCreateCollection(nameCollection);
    }
    else {
        callback();
    }
};

const handleDeleteCollection = (id)=>{
    const accessToken = cookies.get("accessToken");

    const config = {
        method: 'DELETE',
        url: `${COLLECTIONS_URL}/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${accessToken}`
        },
    };

    axios.request(config)
        .then(response => response.data)
        .then(data => {
            if (data && data['message'] === 'Success') {
                alert("Deleted collection");
            }
        })
        .catch(error => {
            console.log("Error occurred when trying to delete collection.");
            if (error.response) {
                alert(error.response.data.message);
            }
            else {
                alert("Something went wrong. Please check your internet connection.");
            }
        })
};

export async function deleteCollection(idCollection, callback) {
    const verifyProcess = await auth.verifyAccessToken();

    if (verifyProcess) {
        handleDeleteCollection(idCollection);
    }
    else {
        callback();
    }
};