var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper')

var router = express.Router();
//获取商品列表
router.post('/list',function(req, res, next) {
        query('CALL p_getCartInfo(?);', [req.session.name])
                .then(data => res.send(httpResult.success(data[0])))
                .catch(message => res.send(httpResult.error(null,message)));
});
//数量增加功能
router.post('/increase', function(req, res, next) {
        var id = parseInt(req.body.id)
        query('UPDATE `dt_cart` SET `count` = `count` + 1, `shoppingTime` = ? WHERE `id` = ?;',[ new Date(), id ] )
                .then(results => {
                        if(results.affectedRows === 1) res.send(httpResult.success());
                        else res.send(httpResult.failure(null,'新增商品数量失败..'));
                })
                .catch(message => res.send(httpResult.error(null,message)));
});
//数量减少功能
router.post('/decrease', function(req, res, next) {
        var id  = parseInt(req.body.id)
        query('UPDATE `dt_cart` SET `count` = `count` - 1, `shoppingTime` = ?  WHERE `id` = ?;',[ new Date(),id ])
                .then(results => {
                        if(results.affectedRows === 1) res.send(httpResult.success());
                        else res.send(httpResult.failure(null,'新增商品数量失败..'));
                })
});
// 删除功能
router.post('/remove', function(req, res, next) {
        var ids = JSON.parse(req.body.ids);
        query('DELETE FROM `dt_cart` WHERE `id` IN (?);', [ids])
                .then(results => {
                        if(results.affectedRows === ids.length)  res.send(httpResult.success());
                        else res.send(httpResult.failure(null,"删除商品失败。。"));
                })
                .catch(message => res.send(httpResult.error(null,message)));
});
//结算功能
router.post('/settlement',function(req, res ,next) {
        var account = parseInt(req.body.account);
        var ids = JSON.parse(req.body.ids).join(',');
        var name = req.session.name;
        query('CALL p_settlement(?,?,?,?);', [ids, account, new Date(), name ])
                .then(results =>  res.send(httpResult.success()))
                .catch(message => res.send(httpResult.error(null,message)));
});
//添加到购物车
router.post("/add", function(req, res, next) {
        var pid = parseInt(req.body.id);
        var count = parseInt(req.body.count);
        var name = req.session.name;
        query('CALL p_addProductToCart(?,?,?,?);', [ name, pid, count, new Date() ])
                .then(results => {
                        if(results[0][0].result === '') res.send(httpResult.success());
                        else res.send(httpResult.failure(null,results[0][0].result));
                })
                .catch(message => res.send(httpResult.error(null,message)));
})

module.exports = router;