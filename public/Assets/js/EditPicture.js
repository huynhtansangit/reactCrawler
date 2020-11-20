$(document).ready(function () {
    // DECLARE INITIAL ACTION (LIKE HIDING SOME TABS, LOADING SOMETHING)
    
    // ẩn tất cả các edit-pic-option.
    $(".edit-pic-option").hide();
    $("#edit-pic-text-option").show();


    // DECLARE HELPER FUNCTION
    function showEditPicOption(selectedOption){
        let idSelectedOption = selectedOption.attr('id');

        // Hiện mỗi tab click
        if(idSelectedOption === 'edit-pic-text-main-option'){
            $("#edit-pic-text-option").show();
        }
        else if(idSelectedOption === 'edit-pic-color-main-option'){
            $("#edit-pic-color-option").show();
        }
        else{
            $("#edit-pic-image-option").show();
        }
    }


    // DECLARE EVENT HANDLER
    $(".edit-pic-main-option").on("click", function(){
        $(".edit-pic-main-option").removeClass("selected-edit-pic-main-option"); //bỏ lựa chọn cái nút đã select trước đó.
        $(this).addClass("selected-edit-pic-main-option"); //select nút mới.

        // Ẩn các cái menu còn lại.
        $(".edit-pic-option").hide();
        // show cái mới được chọn.
        showEditPicOption($(this));
    });

    // Xử lý range bar khi điều chỉnh sẽ có edit hình real-time
    $("input[type='range']").on('input', function(){
        //Xử lý với Id ở đây.
        console.log($(this).attr('id'));
    })
})