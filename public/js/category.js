function updateMianCategory(data) {
        data.forEach(function(item) {
                $(`
                        <li data-id="${ item.id }" data-avatar="${ item.avatar }">
                                <span>${ item.name }</span>
                        </li>
                `).appendTo("ul.category-main");
        });
        $("ul.category-main>li").click(function() {
                if($(this).hasClass("active")) return;
                $(this).addClass("active").siblings().removeClass("active");
                $("img.avatar").attr("src", $(this).attr("data-avatar"));
                var id = parseInt($(this).attr("data-id"));
                getSubCategoryData(id);
        }).first().addClass("active");
}
function updateSubCategory(data) {
        $("ul.category-sub").empty();
        data.forEach(function(item) {
                $(`
                        <li>
                                <a href="list.html?cid=${ item.id }&name=${ item.name }">
                                        <img src="${ item.avatar }" />
                                        <span>${ item.name }</span>
                                </a>
                        </li>
                `).appendTo("ul.category-sub")
        });
}
function getSubCategoryData(id) {
        myHttp({
                type: "get",
                url: "/category/sub",
                data: { id: id },
                success: function(data) {
                        updateSubCategory(data);
                }
        });
}
myHttp({
        type: 'get',
        url:'/category/main',
        success: function(data) {
                updateMianCategory(data);
                getSubCategoryData(data[0].id);
                $('img.avatar').attr('src',data[0].avatar);
        }
});