import download from 'downloadjs'

export const downloadFromLink = (url, name = "image.jpg") => {
    var x = new XMLHttpRequest();
    x.open("GET", url, true);
    x.responseType = 'blob';
    x.onload = function (e) { download(x.response, name, "image/jpg"); }
    x.send();
}
