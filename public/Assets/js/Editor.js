// $('.tui-image-editor-download-btn').on('click', function() {
//     // var imageName = imageEditor.getImageName();
//     // var dataURL = imageEditor.toDataURL();
//     // var blob, type, w;

//     // if (supportingFileAPI) {
//     //     blob = base64ToBlob(dataURL);
//     //     type = blob.type.split('/')[1];
//     //     if (imageName.split('.').pop() !== type) {
//     //         imageName += '.' + type;
//     //     }

//     //     // Library: FileSaver - saveAs
//     //     saveAs(blob, imageName); // eslint-disable-line
//     // } else {
//     //     alert('This browser needs a file-server');
//     //     w = window.open();
//     //     w.document.body.innerHTML = '<img src=' + dataURL + '>';
//     // }

//     var jpegUrl = $("canvas").toDataURL("image/jpeg");
//     window.saveAs(jpegUrl,"image.jpg")
// });