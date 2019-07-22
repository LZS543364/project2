//更新总数量与价格
function updateTotalCountAndPrice() {
        var totalCount = 0, totalPrice = 0, count = 0, price = 0;
        $('span.checkbox.normal.checked').each(function(i,item) {
                count = parseInt($(item).closest('li').find('.count').text());
                price = parseInt($(item).closest('li').find('.price').text());
                totalCount += count;
                totalPrice += count * price;
        });
        $('span.total-count').text(totalCount === 0 ? '' : `(${ totalCount })`);
        $('span.total-price').text(totalPrice);
}
//增加按钮功能
function increaseHandler(e) {
        if(parseInt($(e.target).prev().text()) === 5)  { alert('商品数量已经达到上限..');return;}
        myHttp({
                type: 'post',
                url: '/cart/increase',
                data: { id: $(e.target).closest('li').attr('data-id')},
                success: function(data) {
                        var $target = $(e.target).prev();
                        $target.text(parseInt($target.text()) + 1);
                        updateTotalCountAndPrice();
                }
        });
}
//减少按钮功能
function decreaseHandler(e) {
        if(parseInt($(e.target).next().text()) ===1) { alert('不要再减了！！！！！');return;}
        myHttp({
                type: 'post',
                url: '/cart/decrease',
                data: { id: $(e.target).closest('li').attr('data-id')},
                success: function(data) {
                        var $target = $(e.target).next();
                        $target.text(parseInt($target.text()) - 1);
                        updateTotalCountAndPrice();
                }
        })
}


function initPage() {
        //1.进入退出编辑状态
        $('.btn-edit').click(function() {
                if($(this).text() === '完成') {
                        updateTotalCountAndPrice();
                        if($('ul.cart-list span.checkbox.normal:not(.checked)').length === 0)
                                $('.footer-normal span.all').addClass('checked');
                }
                $(this).text($(this).text() === '完成' ? '编辑' : '完成');
                $('.footer-normal,.footer-edit,ul.cart-list span.checkbox').toggle();
        });
        //3.全选反选功能实现
        $('.footer-normal span.all').click(function() {
                if($(this).hasClass('checked'))  $(this).add('ul.cart-list span.normal').removeClass('checked');
                else $(this).add('ul.cart-list span.normal').addClass('checked');
                updateTotalCountAndPrice();
        });
        $('.footer-edit span.all').click(function() {
                if($(this).hasClass('checked')) $(this).add('ul.cart-list span.edit').removeClass('checked');
                else $(this).add('ul.cart-list span.edit').addClass('checked');
        });
        $('span.checkbox.normal').click(function() {
                $(this).toggleClass('checked');
                if($('span.checkbox.normal:not(.checked)').length > 0) $('.footer-normal span.all').removeClass('checked');
                else $('.footer-normal span.all').addClass('checked');
                updateTotalCountAndPrice();
        });
        $('span.checkbox.edit').click(function() {
                $(this).toggleClass('checked');
                if($('span.checkbox.edit:not(.checked)').length > 0) $('.footer-edit span.all').removeClass('checked');
                else $('.footer-edit span.all').addClass('checked');
        });
        //加减数量（利用冒泡）
        $('ul.cart-list').click(function(e) {
                if($(e.target).hasClass('increase')) increaseHandler(e);
                if($(e.target).hasClass('decrease')) decreaseHandler(e);
        })
        //批量删除购物车中的商品
        $(".btn-remove").click(function() {
                var $checked = $('span.checkbox.edit.checked');
                if($checked.length < 1) { alert('请先选择..');return;}
                if(!confirm('又没钱了？')) return;
                var ids = [];
                $checked.each(function(i,item) {
                        ids.push(parseInt($(item).closest('li').attr('data-id')));
                });
                myHttp({
                        type: 'post',
                        url: '/cart/remove',
                        data: { ids: JSON.stringify(ids) },
                        success: function() {
                                $checked.each(function(i,item) {
                                        $(item).closest('li').remove();
                                });
                                $('.footer-edit span.all').removeClass('checked');
                        }
                });
        });
//结算功能
        $('.btn-settlement').click(function() {
                var $checked = $('span.checkbox.normal.checked');
                if($checked.length < 1) { alert('请先选择..');return;}
                var ids = [];
                $checked.each(function(i,item) {
                        ids.push(parseInt($(item).closest('li').attr('data-id')));
                });
                myHttp({
                        type: 'post',
                        url: '/cart/settlement',
                        data: {
                                ids: JSON.stringify(ids),
                                account: $('span.total-price').text()
                        },
                        success: function() {
                                $checked.each(function(i,item) {
                                        $(item).closest('li').remove();
                                });
                                $('.footer-normal .span.all').removeClass('checked');
                                updateTotalCountAndPrice();
                                alert('结算生成订单成功，5s后将自动跳转到付款页面..');
                                setTimeout(function() {
                                        window.location.href = 'category.html';
                                },5000);
                        }
                });
        });
}

//2.ajax请求展示列表数据
myHttp({
        type: 'post',
        url: '/cart/list',
        success: function(data) {
                data.forEach(function(item) {
                        $(`
                                <li data-id="${ item.id }">
                                        <span class="checkbox normal checked" ></span>
                                        <span class="checkbox edit"></span>
                                        <a href="detail.html?id=${ item.pid }" class="avatar-wrapper">
                                                <img src="${ item.avatar }" alt="">
                                        </a>
                                        <div class="info">
                                                <a href="detail.html?id=${ item.pid }" class="name">${ item.name }</a> <br>
                                                <a href="detail.html?id=${ item.pid }" class="price-wrapper"> ￥ <span class="price"> ${ item.price }</span></a>
                                                <div class="count-wrapper">
                                                        <span class="decrease">-</span>
                                                        <span class="count">${ item.count }</span>
                                                        <span class="increase">+</span>
                                                </div>
                                        </div>
                                </li>
                        `).appendTo('ul.cart-list');
                })
                initPage();
                updateTotalCountAndPrice();
        }
});




