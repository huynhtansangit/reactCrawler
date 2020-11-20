
window.setTimeout(function(){
    document.getElementById("gallery-section").scrollIntoView();
},1000)

$(".submit-btn").click(function (e) { 
    e.preventDefault();
    $("nav").fadeToggle(400);   
});
var scrollVar=0;
$(window).scroll(function () { 
    var x =$(this).scrollTop();
if(x>scrollVar){
    $('nav').removeClass('d-none');
    $('nav').fadeIn(200);
}
else{
    $('nav').fadeOut("slow", function() {
        $('nav').addClass('d-none');
    });
}
});


