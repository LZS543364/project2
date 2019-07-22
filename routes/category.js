var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();

//缓存（所有用户都会看的数据且是一样的数据）
var category = null;
//创建连接对象connect
	//通过connect连接对象调用query方法自动连接数据库，执行指定的sql语句
	query('SELECT * FROM `dt_category`;')
		.then(results => category = results)
		.catch(message => console.log(message));

//处理获取一级分类的请求
router.get('/main', function(req,res,next) {
	var data = category.filter(item => item.fid === 0);
	res.send(httpResult.success(data));
});

//处理获取指定一级分类的二级分类信息的请求
router.get('/sub',function(req,res,next) {
	var id = parseInt(req.query.id);
	var data = category.filter(item => item.fid === id);
	res.send(httpResult.success(data));
});

module.exports = router;