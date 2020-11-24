
$(document).ready(function () {
    // DECLARE INITIAL ACTION (LIKE HIDING SOME TABS, LOADING SOMETHING)
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    // ẩn tất cả các edit-pic-option.
    $(".edit-pic-option").hide();
    $("#edit-pic-text-option").show();


    // DECLARE HELPER FUNCTION
    function showEditPicOption(selectedOption) {
        let idSelectedOption = selectedOption.attr('id');

        // Hiện mỗi tab click
        if (idSelectedOption === 'edit-pic-text-main-option') {
            $("#edit-pic-text-option").show();
        }
        else if (idSelectedOption === 'edit-pic-color-main-option') {
            $("#edit-pic-color-option").show();
        }
        else {
            $("#edit-pic-image-option").show();
        }
    }

    

    // DECLARE EVENT HANDLER
    $(".edit-pic-main-option").on("click", function () {
        $(".edit-pic-main-option").removeClass("selected-edit-pic-main-option"); //bỏ lựa chọn cái nút đã select trước đó.
        $(this).addClass("selected-edit-pic-main-option"); //select nút mới.

        // Ẩn các cái menu còn lại.
        $(".edit-pic-option").hide();
        // show cái mới được chọn.
        showEditPicOption($(this));
    });
    // Filter and Effect 
    // let brightRange =$('#input-adjust-pic-bright');
    // brightRange.change(function (e) { 
    //     e.preventDefault();
    //     $("#bright-current").text(this.value);
    //     Caman('#canvas',function(){
    //         this.brightness(5).render();
    //     })
    // });
    let img;
    document.addEventListener("click", e => {
        if (e.target.classList.contains("filter-btn")) {
          if (e.target.classList.contains("brightness-add")) {
            Caman("#canvas", img, function() {
              this.brightness(2).render();
              var value =$('.bright-value').text();
              $('.bright-value').text(parseInt(value)+2);
            });
          } else if (e.target.classList.contains("brightness-remove")) {
            Caman("#canvas", img, function() {
              this.brightness(-2).render();
              var value =$('.bright-value').text();
              $('.bright-value').text(value-2);
            });
          } else if (e.target.classList.contains("contrast-add")) {
            Caman("#canvas", img, function() {
              this.contrast(2).render();
            });
          } else if (e.target.classList.contains("contrast-remove")) {
            Caman("#canvas", img, function() {
              this.contrast(-2).render();
            });
          } else if (e.target.classList.contains("saturation-add")) {
            Caman("#canvas", img, function() {
              this.saturation(2).render();
            });
          } else if (e.target.classList.contains("saturation-remove")) {
            Caman("#canvas", img, function() {
              this.saturation(-2).render();
            });
          } else if (e.target.classList.contains("vibrance-add")) {
            Caman("#canvas", img, function() {
              this.vibrance(2).render();
            });
          } else if (e.target.classList.contains("vibrance-remove")) {
            Caman("#canvas", img, function() {
              this.vibrance(-2).render();
            });
            }
        }
    })
    // load Img preview
    let changeImg = document.getElementById("change-image");
    let previewImage =document.getElementById("foto-image");
    changeImg.addEventListener('click',function(e)
    {
        let url =document.getElementById("link-input");
        console.log(url);
        let value = url.value;
        //Add to canvas
        img=new Image();
        //set source
        img.crossOrigin = "Anonymous";
        //on image load
        img.onload=function(){
            canvas.width=img.width;
            canvas.height=img.height;
            context.drawImage(img,0,0,img.width,img.height);
            canvas.removeAttribute('data-caman-id');
        }
        console.log("done");
    })

})

