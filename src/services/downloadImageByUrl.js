import download from 'downloadjs'
import auth from '../auth/auth'

const sleep = (ms) =>{
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const downloadImageFromLink = async (url, callback) => {
    const result = await auth.verifyAccessToken();
    const name = "image.jpg"
    if(result===true)
    {
        let x = new XMLHttpRequest();
        x.open("GET", url, true);
        x.responseType = 'blob';
        x.onload = function (e) { download(x.response, name, "image/jpg"); }
        x.send();
    }
    else{
      callback&&callback();
    }
}

export const downloadMultiImagesFromLink = async (listImage, callback) => {
  const result = await auth.verifyAccessToken();
  const name = "image.jpg"
  if(result===true)
  {
    for(const element of listImage){
      let x = new XMLHttpRequest();
      x.open("GET", element.url, true);
      await sleep(1000);
      x.responseType = 'blob';
      x.onload = function (e) { download(x.response, name, "image/jpg"); }
      x.send();
    };
  }
  else{
    callback&&callback();
  }
}
