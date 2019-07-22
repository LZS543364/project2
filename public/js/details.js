var params = window.location.search.substr(1);
var id = parseInt(params.split("=")[1]);

myHttp({
        type: "post",
        url: "/details",
        data: {id: id},
        success: function(results){
                var bannerImages = results[0].bannerImages.split(",");
                $(`
                        <div class="swiper-container swiper1" >
                                <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                                <img src="${ bannerImages[0] }" alt="">
                                        </div>
                                        <div class="swiper-slide">
                                                <img src="${ bannerImages[1] }" alt="">
                                        </div>
                                        <div class="swiper-slide">
                                                <img src="${ bannerImages[2] }" alt="">
                                        </div>
                                        <div class="swiper-slide">
                                                <img src="${ bannerImages[3] }" alt="">
                                        </div>
                                        <div class="swiper-slide">
                                                <img src="${ bannerImages[4] }" alt="">
                                        </div>
                                </div>
                                <div class="swiper-pagination"></div>
                        </div>
                        <div class="intro">
                                 <h3>￥${ results[0].price }</h3>
                                 <div class="remark">
                                        <div>
                                                <img src="images/details/detail_icon_crowd.png" alt="">
                                                <h4>${ results[0].name }</h4>
                                        </div>
                                </div>
                                 <p>${ results[0].remark }</p>
                        </div>
                `).appendTo(".detail-top");
                $(`
                        <div class="meng-item">
                                <span class="meng-item1">
                                        <img src="${ results[0].avatar }" alt="" />
                                        <span>
                                                <h3>￥${ results[0].price }</h3>
                                                <span>
                                                        <p>已选：</p>
                                                        <h4 class="account">1</h4>件
                                                </span>
                                        </span>
                                </span>
                                <p>数量</p>
                                <span class="plus">
                                        <span class="decrease"><img src="images/details/sku_icon_minus_no.png" alt=""></span>
                                        <span class="count">1</span>
                                        <span class="increase"><img src="images/details/sku_icon_plus_no.png" alt=""></span>
                                </span>
                                <input type="button" value="确定" class="add-to">
                        </div>
                `).appendTo(".meng");
                $(".decrease").click(function() {
                        var target = $(this).next();
                        if(parseInt(target.text()) === 1 ) {
                                alert("商品数量不能小于1");
                        } else {
                                target.text(parseInt(target.text()) -1);
                                $(".account").text(target.text());
                        }
                });
                $(".increase").click(function(){
                        var target = $(this).prev();
                        if(parseInt(target.text()) === 5){
                                alert("购买商品数量已达上限");
                        }else{
                                target.text(parseInt(target.text()) + 1);
                                $(".account").text(target.text());
                        }
                });
                $(".add-to").click(function() {
                        var count = parseInt($(".count").text());

                        myHttp({
                                type: "post",
                                data: {
                                        id: id,
                                        count: count
                                },
                                url: "/cart/add",
                                success: function() {
                                        alert("加入购物车成功");
                                        $(".meng").toggle();
                                }
                        })
                });

                var swiper1 = new Swiper('.swiper-container', {
                        loop: true,
                        autoplay: true,//可选选项，自动滑动
                        pagination: {
                                el: '.swiper-pagination',
                                type: 'fraction'
                        },
                })
        },

});

$(".images-container").click(function() {
        $(".images-item,.images-item1").toggle();
});

$(".add").click(function() {
        $(".meng").toggle();
});

$(".top-left").click(function() {
        window.history.back(-1);
});

$(".jump").click(function() {
        window.location.href = "cart.html";
});

myHttp({
        type: "post",
        url: "/product/list",
        data: { cid: 14 },
        success: function(data){
                data.forEach(function(item) {
                        $(`
                        <li>
                                <a href="details.html?id=${ item.id }">
                                        <div class='avatar-wrapper'>
                                                <img src="${ item.avatar }" alt="">
                                        </div>
                                        <p class="ellipsis">${ item.remark }</p>
                                        <h3 class="ellipsis">${ item.name }</h3>
                                        <span>￥${ item.price }</span>
                                 </a>
                        </li>`).appendTo(".content-wrapper>ul");
                });
        }
});
