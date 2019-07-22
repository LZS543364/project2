var index = 0;
var timer = null;
function toggleImage(targetIndex){
        document.querySelector(".banner-images>.active").className = "";
        document.querySelector(".banner-indicators>.active").className = "";
        index = targetIndex;
        document.querySelectorAll(".banner-images>li")[index].className = "active";
        document.querySelectorAll(".banner-indicators>li")[index].className = "active";
}

function autoplay() {
        timer = setInterval(function(){
                toggleImage(index + 1 > 4 ? 0 : index + 1);
        }, 3000)
}

var indicators = document.querySelectorAll(".banner-indicators>li");
for( var i = 0; i < indicators.length; i++) {
        (function(j){
                indicators[j].onclick = function() {
                        toggleImage(j);
                };
        })(i);
}
autoplay();

var mySwiper = new Swiper('.swipera', {
        autoplay:true,
        loop:true,
        pagination: {
                el: '.swiper-pagination',
                clickable:true,
        }
});

var mySwiper = new Swiper('.swiperb', {
        slidesPerView : 3,
});