$('span[class^=title]').click(function() {
        $(".login-phone, .login-pwd, span.title-phone, span.title-pwd").toggle();
});

$(".code").click(function() {
        myHttp({
                type: "get",
                dataType: "json",
                url: "/login/getcode",
                success: function(data) {
                        $(".code").text(data);
                }
        });
});

$('.btn-phone').click(function() {
        if($('.code').text() !== $('.code2').val().toUpperCase()) {
                alert('验证码错误...');
                return;
        }
        myHttp({
                type: 'post',
                url: '/login/phone',
                data: {
                        phone:$('.phone').val(),
                        code: $('.code2').val(),
                },
                success: function(data) {
                        window.location.href = this.Cookies.get('target');
                }
        });
});

$('.btn-pwd').click(function() {
        myHttp({
                type: 'post',
                url:'/login/pwd',
                data: {
                        account: $('.account').val(),
                        pwd: $('.pwd').val()
                },
                success: function(data) {
                        window.location.href = this.Cookies.get('target') || "home.html";
                }
        });
});