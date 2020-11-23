$(document).ready(function () {
    $(".dropdown-item").on('click',function() {
        // console.log($(this).text());
        $(".btn-select-social-network").text($(this).text());
    })
})