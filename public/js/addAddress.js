/**
 *
 * cityPicker.js
 * cityPicker is made by Framework picker component which effects like iOS native select.
 *
 * nzb329@163.com
 *
 * 2017-10-28
 *
 */
;
(function(window, $, undefined) {

    /**
     * [getProvince 获取省]
     * @param  {[Object]} regions [省市区数据]
     * @return {[Array]}          [省数组]
     */
    function getProvince(regions) {

        return regions['provincesArr'];
    }

    /**
     * [getCity 获取市]
     * @param  {[Object]} regions      [省市区数据]
     * @param  {[String]} provinceName [省名]
     * @return {[Array]}               [市数组]
     */
    function getCity(regions, provinceName) {

        return regions['provinces'][provinceName]['citiesArr'];
    }

    /**
     * [getArea 获取区]
     * @param  {[Object]} regions      [省市区数据]
     * @param  {[String]} provinceName [省名]
     * @param  {[String]} cityName     [市名]
     * @return {[Array]}               [区数组]
     */
    function getArea(regions, provinceName, cityName) {

        return regions['provinces'][provinceName]['cities'][cityName]['areasArr'];

    }

    // 初始化 Framework7
    var myApp = new Framework7();
    var s = new Date();

    // 初始化省市区
    var province = getProvince(regions),
        city = getCity(regions, '北京市'),
        area = getArea(regions, '北京市', '北京市');
    console.log(getArea(regions, '广东省', '中山市') == 0)
    var e = new Date();
    console.log(e - s);
    // 保存 picker 选择的省
    var provinceSelect = '';

    // 省市区联动 / Framework7 picker
    var pickerLocation = myApp.picker({
        input: '#location',
        rotateEffect: true,
        toolbarTemplate: '<div class="toolbar">\
                            <div class="toolbar-inner">\
                                <div class="left">\
                                    <a href="#" class="link close-picker">取消</a>\
                                </div>\
                                <div class="right">\
                                    <a href="#" class="link close-picker">完成</a>\
                                </div>\
                            </div>\
                        </div>',
        cols: [{
                cssClass: 'f-s-14',
                width: '33.33%',
                textAlign: 'left',
                values: province,
                onChange: function(picker, province) {
                    if (picker.cols[1].replaceValues) {
                        provinceSelect = province;
                        city = getCity(regions, province);
                        area = getArea(regions, province, city[0]);
                        picker.cols[1].replaceValues(city);
                        if (area.length !== 0) {
                            picker.cols[2].replaceValues(area);
                        } else {
                            picker.cols[2].replaceValues(city);
                        }
                    }
                }
            },
            {
                cssClass: 'f-s-14',
                width: '33.33%',
                textAlign: 'center',
                values: city,
                onChange: function(picker, city) {
                    if (picker.cols[2].replaceValues) {
                        area = getArea(regions, provinceSelect, city);
                        if (area.length !== 0) {
                            picker.cols[2].replaceValues(area);
                        } else {
                            picker.cols[2].replaceValues([city]);
                        }
                    }
                }
            },
            {
                cssClass: 'f-s-14',
                width: '33.33%',
                textAlign: 'right',
                values: area,
            }
        ]
    });


})(window, jQuery);

$('.add-address').click(function() {
        var receiveName = $('.receive-name').val();
        var receiveTel = $('.receive-phone').val();
        var receiveAddress = $('.receive-city').val();
        var receiveDetail = $('.receive-detail').val();
        if($('.receive-name').val() === '') { alert("请输入收货人姓名..."); return; }
        if($('.receive-phone').val() === '') { alert("请输入收货人电话..."); return; }
        if($('.receive-city').val() === '') { alert("请选择收货人所在城市..."); return; }
        if($('.receive-detail').val() === '') { alert("请输入收货人详细地址..."); return; }
        myHttp({
                type: 'post',
                url: '/address/add',
                data: { receiveName: receiveName,receiveTel: receiveTel,receiveAddress: receiveAddress,receiveDetail:receiveDetail  },
                success: function() {
                        alert('地址添加成功...');
                        window.location.href = 'address.html';
                }
        });
});

$(".go").click(function() {
        window.history.go(-1);
});