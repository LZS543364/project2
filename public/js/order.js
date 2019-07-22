 function initOrder(data) {
        data.forEach(function(item) {
                $(`
                        <li>
                               <div class="tim">
                                       <div>
                                                <p>${ item.shoppingTime }</p>
                                                <h4>已收货</h4>
                                        </div>
                                </div> 
                                <div class="order-wrapper">
                                        <img src="${ item.avatar }" alt="">
                                        <div class="order-content">
                                                <span class="order-top">
                                                        <p>${ item.name }</p>
                                                        <h5>￥${ item.price }</h5>
                                                </span>
                                                <p align="right">X${ item.count }</p>
                                                <span class="order-bottom">
                                                        <p align="right">共计${ item.count }件商品，总金额 <a href="">￥${ item.account }</a> </p>
                                                </span>
                                        </div>
                                </div>
                                <div class="btn">
                                        <input type="button" value="删除订单" class="del"/>
                                        <input type="button" value="评价晒单" class="evaluate">
                                </div>
                        </li>
                `).appendTo(".content>ul");

        })
 };
myHttp({
        type: 'post',
        url:"/order/list",
        success: function(data) {
                initOrder(data[0]);
        }
});