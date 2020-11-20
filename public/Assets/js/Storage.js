$(document).ready(function () {
    // DECLARE INITIAL ACTION (LIKE HIDING SOME TABS, LOADING SOMETHING)
    
    // ẩn tất cả các tab ở storage, chỉ hiện tab mặc định là picture-storage-container.
    //không thể dùng .hide() vì swiper không cho => phải dùng important
    $(".storage-tab").attr( "style", "display: none !important;" ); 
    $("#picture-storage-container").show();
    
    // For swiper, tạm thời đang bỏ, nếu trong tương lai không cần nữa sẽ xóa.
    // new Swiper('.swiper-container', {
    //     // Optional parameters
    //     direction: 'vertical',
    //     loop: true,

    //     // If we need pagination
    //     pagination: {
    //         el: '.swiper-pagination',
    //     },

    //     // Navigation arrows
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },

    //     // And if we need scrollbar
    //     scrollbar: {
    //         el: '.swiper-scrollbar',
    //     },

    //     // Prevent not changing width anymore
    //     slidesPerView:'auto'
    // })


    // DECLARE HELPER FUNCTION
    function showStorageTab(clickedBtn){
        // Vì phải sử dụng lại các tên như video-customized-btn nên sẽ dùng class thay vì id
        // Vì vậy phải xử lý click là kiếm xem có tên class này trong mớ class ko.
        let classClickedBtn = clickedBtn.attr('class');
        
        // Ẩn tất cả các tab, không thể dùng .hide() vì bị swiper không cho => phải dùng important
        $(".storage-tab").attr( "style", "display: none !important;" )

        // // Ẩn các arrow cũ đi
        // $(".customized-btn-arrow-place-holder ").removeClass("selected-customized-btn-arrow");

        // Hiện mỗi tab click
        if(classClickedBtn.includes('profile-customized-btn')){
            $("#profile-storage-container").show();
            // Và show arrow mới.
            $("#profile-arrow-place-holder").addClass("selected-customized-btn-arrow"); //select nút mới.
        }
        else if(classClickedBtn.includes('picture-customized-btn')){
            $("#picture-storage-container").show();

            $("#picture-arrow-place-holder").addClass("selected-customized-btn-arrow"); //select nút mới.
        }
        else{
            $("#video-storage-container").show();

            $("#video-arrow-place-holder").addClass("selected-customized-btn-arrow"); //select nút mới.
        }
    }



    // DECLARE EVENT HANDLER
    $(".customized-btn").on("click", function () {
        $(".customized-btn").removeClass("selected-customized-btn"); //bỏ lựa chọn cái nút đã select trước đó.
        $(this).addClass("selected-customized-btn"); //select nút mới.

        // Ẩn các cái còn lại.
        $(".storage-tab").hide();
        // show cái mới được chọn.
        showStorageTab($(this));
    });
})