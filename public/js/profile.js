myHttp({
        type: 'post',
        url: '/profile/center',
        success: function(data) {
               $(".user-name").text(data)
        }
});

$(".address").click(function() {
        window.location.href = "address.html";
});
$(".top-m").click(function() {
        window.location.href = "order.html";
});