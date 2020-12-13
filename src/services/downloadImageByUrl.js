import download from 'downloadjs'
import auth from '../auth/auth'

export const downloadImageFromLink = async (url, callback) => {
    const result = await auth.verifyAccessToken();
    const name = "image.jpg"
    if(result===true)
    {
        var x = new XMLHttpRequest();
        x.open("GET", url, true);
        x.responseType = 'blob';
        x.onload = function (e) { download(x.response, name, "image/jpg"); }
        x.send();
    }
    else{
      callback&&callback();
    }
}

// Codes below can not download video
// export const downloadVideoFromLink = (url, name = "video.mp4") => {
//     var x = new XMLHttpRequest();
//     x.open("GET", url, true);
//     x.responseType = 'blob';
//     x.onload = function (e) { download(x.response, name, "video/mp4"); }
//     x.send();
// }
