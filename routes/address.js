var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper')

var router = express.Router();

router.post("/list", function (req,res,next) {
       var name = req.session.name;
        query('SELECT * FROM `dt_address` WHERE `name` = ?;', [ name ])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)));
});

router.post("/remove", function (req,res,next) {
        var id = parseInt(req.body.id);
        query('DELETE FROM `dt_address` WHERE `id` = ?;', [ id ])
                .then(results => {
                        if(results.affectedRows === 1) res.send(httpResult.success(results));
                        else res.send(httpResult.failure(null, "删除失败。。。"))
})
                .catch(message => res.send(httpResult.error(null, message)));
});

router.post("/add", function (req,res,next) {
        var receiveName = req.body.receiveName;
        var receiveTel = req.body.receiveTel;
        var receiveAddress = req.body.receiveAddress;
        var receiveDetail = req.body.receiveDetail;
        var name = req.session.name;
        query('INSERT `dt_address` (`name`,`receiveName`,`receiveTel`,`receiveAddress`,`receiveDetail`) VALUES(?,?,?,?,?);', [ name, receiveName, receiveTel, receiveAddress,receiveDetail ])
                .then(results => {
                        console.log(results);
                        if(results.affectedRows === 1) res.send(httpResult.success(results.insertId, "地址添加成功。。"));
                        else res.send(httpResult.failure(null, "地址添加失败。。。"))
                })
                .catch(message => res.send(httpResult.error(null, message)));
});

router.post("/update", function (req,res,next) {
        var receiveName = req.body.receiveName;
        var receiveTel = req.body.receiveTel;
        var receiveAddress = req.body.receiveAddress;
        var receiveDetail = req.body.receiveDetail;
        var id = parseInt(req.body.id);
        query('UPDATE `dt_address` SET `receiveName` = ?,`receiveTel` = ?,`recriveAddress` = ?,`receiveDetail` = ? WHERE `id` = ?;', [ receiveName, receiveTel, receiveAddress,receiveDetail, id ])
                .then(results => {
                        console.log(results);
                        if(results.affectedRows === 1) res.send(httpResult.success(null, "地址更新成功。。"));
                        else res.send(httpResult.failure(null, "地址更新失败。。。"))
                })
                .catch(message => res.send(httpResult.error(null, message)));
});

router.post("/default", function (req,res,next) {
        var id = parseInt(req.body.id);
        var name = req.session.name;
        query('UPDATE `dt_address` SET `isDefault` = 0 WHERE `name` = ?;', [ name, id ])
                .then(results => res.send(httpResult.failure(null, "默认地址设置成功。。。")))
                .catch(message => res.send(httpResult.error(null, message)));
});


module.exports = router;