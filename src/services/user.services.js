import auth from '../auth/auth'
import { ADD_TO_COLLECTION_URL } from '../utils/config.url'
import cookies from '../utils/cookie'
import axios from 'axios'
import download from 'downloadjs'

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

const handleAddToCollection = async (url, thumbnail, type) => {
    const accessToken = cookies.get("accessToken");

    const data = {
        "url": url,
        "thumbnail": thumbnail,
        "type": type
    };

    let config = {
        method: 'post',
        url: ADD_TO_COLLECTION_URL,
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
                alert(error.response.data);
            }
            else {
                alert("Something went wrong. Please check your internet connection.");
            }
        })
}

export default async function addToCollection(url, thumbnail, type, callback) {
    const verifyProcess = await auth.verifyAccessToken();

    if (verifyProcess) {
        handleAddToCollection(url, thumbnail, type);
    }
    else {
        callback();
    }
};