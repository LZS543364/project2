var $overlay = $(`<div class="overlay"></div>`).appendTo("body");

function myHttp(options) {
        options.dataType = "json";
        var success = options.success;
        options.success = function(result) {
                $overlay.toggle();
                if(result.message !== "") alert(result.message);
                switch(result.status) {
                        case 200:
                                success(result.data);
                                break;
                        case 401:
                                Cookies.set("target", window.location.href);
                                window.location.href = "login.html";
                                break;
                        default:
                                break;
                }
        };
        $overlay.toggle();
        setTimeout(function() { $.ajax(options) }, 1000);
}