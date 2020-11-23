$(document).ready(function () {
    $(".dropdown-item").on('click', () => {
        console.log($(this).values);
    })
})