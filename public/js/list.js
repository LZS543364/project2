var params = window.location.search.substr(1).split("&");
var cid = parseInt(params[0].split("=")[1]);
var name = decodeURI(params[1].split("=")[1]);

//更新显示商品列表数据
$("h1.title").text(name);

function updateList(data) {
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
                        </li>`).appendTo(".content>ul");
        });
        // console.log(data);
}

//ajax动态请求显示商品列表数据
myHttp({
        type: "post",
        url: "/product/list",
        data: { cid: cid },
        success: function(data){
             updateList(data);
        }
});