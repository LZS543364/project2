// var name = req.session.name;


function  initAddress(data) {
        data.forEach(function(item) {
                var tel = item.receiveTel;
                var mtel = tel.substr(0, 3) + '****' + tel.substr(7);
                $(`
                        <li>
                                <div class="content-items">
                                        <div class="top">
                                                <p>${ item.receiveName }</p>
                                                <h4>${ mtel  }</h4>
                                        </div>
                                        <div class="content">
                                                <p>${ item.receiveAddress }</p>
                                                <h3>${ item.receiveDetail }</h3>
                                                <h4>26601</h4>
                                        </div>
                                </div>
                                <img src="images/address_icon_editor.png" alt="" class="update">
                        </li>
                   `).appendTo(".address>ul");
                // $(".update").click(function() {
                //         alert(111);
                //         var name = $(".top>p").text();
                //         var phone =$(".top>h4").text();
                //         var address = $(".content>p").text();
                //         var detail = $(".content>h3").text();
                //         $(".receive-name").val(name);
                //         $(".receive-phone").val(phone);
                //         $(".receive-city").val(address);
                //         $(".receive-detail").val(detail);
                //         myHttp({
                //                 type: "post",
                //                 url:"/address/update",
                //                 data: { receiveName: name,receiveTel: phone,receiveAddress:  address,receiveDetail:detail },
                //                 success: function(){
                //                         alert('地址修改成功...');
                //                         window.location.href = 'address.html';
                //                 }
                //         });
                // });
        })
}



myHttp({
        type: "post",
        url: "/address/list",
        success: function(data){
                initAddress(data);
        }
});

$(".nav>img").click(function() {
        window.history.back(-1);
});
$(".footer").click(function() {
        window.location.href = "addaddress.html";
});
