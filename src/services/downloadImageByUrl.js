import download from 'downloadjs'

export const downloadImageFromLink = (url, name = "image.jpg") => {
    var x = new XMLHttpRequest();
    x.open("GET", url, true);
    x.responseType = 'blob';
    x.onload = function (e) { download(x.response, name, "image/jpg"); }
    x.send();
}

// Codes below can not download video
// export const downloadVideoFromLink = (url, name = "video.mp4") => {
//     var x = new XMLHttpRequest();
//     x.open("GET", url, true);
//     x.responseType = 'blob';
//     x.onload = function (e) { download(x.response, name, "video/mp4"); }
//     x.send();
// }
