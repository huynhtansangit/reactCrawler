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

        for (const [idx, el] of listImage.entries()) {
            // loading a file and add it in a zip file
            // eslint-disable-next-line
            JSZipUtils.getBinaryContent(el.url, (err, data) => {
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


// addToCollection, createCollection, deleteCollection won't need callback anymore 
// because getCollections is taking responsibility for redirect if user not logged in yet.
const handleGetCollections = async () => {
    const accessToken = cookies.get("accessToken");

    let config = {
        method: 'GET',
        url: COLLECTIONS_URL,
        headers: {
            'Authorization': `bearer ${accessToken}`
        }
    };

    try {
        const res = await axios.request(config);
            
        if(res.data){
            return res.data;
        }
    } catch (error) {
        console.log("Error occurred when trying to add to collection.");
        if (error.response) {
            return ({error: error.response.data.message});
        }
        else {
            return ({error: "Something went wrong. Please check your internet connection."});
        }
    }
}

export async function getCollections (callback) {
    const verifyProcess = await auth.verifyAccessToken();

    if (verifyProcess) {
        return(await handleGetCollections());
    }
    else {
        callback();
    }
};

const handleAddToCollection = async (url, thumbnail, type, platform, id, source, collectionId) => {
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
        method: 'POST',
        url: `${COLLECTIONS_URL}/${collectionId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${accessToken}`
        },
        data: JSON.stringify(data)
    };

    await axios.request(config)
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

export async function addToCollection(url, thumbnail, type, platform, id, source, collectionId, callback) {
    // No need to verify here.
    const verifyProcess = await auth.verifyAccessToken();

    if (verifyProcess) {
        await handleAddToCollection(url, thumbnail, type, platform, id, source, collectionId);
    }
    else {
        // Callback will never be used.
        callback();
    }
};

const handleCreateCollection = (name) => {
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
    // No need to verify here.
    const verifyProcess = await auth.verifyAccessToken();

    if (verifyProcess) {
        handleCreateCollection(nameCollection);
    }
    else {
        // Callback will never be used.
        callback();
    }
};

const handleDeleteCollection = async (id) => {
    const accessToken = cookies.get("accessToken");

    const config = {
        method: 'DELETE',
        url: `${COLLECTIONS_URL}/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${accessToken}`
        },
    };

    await axios.request(config)
        .then(response => response.data)
        .then(data => {
            if (data && data['message'] === 'Success') {
                // alert("Deleted collection");
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
    // No need to verify here.
    const verifyProcess = await auth.verifyAccessToken();

    if (verifyProcess) {
        await handleDeleteCollection(idCollection);
    }
    else {
        // Callback will never be used.
        callback();
    }
};