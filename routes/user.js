var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();

//获取验证码
router.get('/getcode',function(req,res,next) {
	var letters = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
	var code = '';
	for(var i = 1; i <= 4; i++) {
		code += letters[Math.floor(Math.random() * letters.length)];
	}
	req.session.code = code;
	res.send(httpResult.success(code));
});

//手机登录验证
router.post('/phone',function(req,res,next) {
	var phone = req.body.phone;
	if(req.body.code.toUpperCase() === req.session.code) {
		query('CALL p_loginByPhone(?)', [ phone ])
			.then(results => {
				req.session.name = results[0][0].name;//将成功登陆的用户名写入session为后续功能做准备
				res.send(httpResult.success());
			})
			.catch(message => res.send(httpResult.error(null,message)));
	} else res.send(httpResult.failure(null,'验证码错误..'));

});

//用户名密码登录验证
router.post('/pwd', function(req,res,next) {
	var account = req.body.account;
	var pwd = req.body.pwd;
	query('CALL p_loginByPwd(?,?)', [ account,pwd ])
		.then(results => {
			if(results[0][0].result === '') {
				req.session.name = account;//将成功登陆的用户名写入session为后续功能做准备
				res.send(httpResult.success());
			} else res.send(httpResult.failure(null,results[0][0].result));
		})
		.catch(message => res.send(httpResult.error(null,message)));
});



// 	if(target) {
// 		if(target.pwd === pwd){
// 			//将成功登陆的用户名，写入session，为后续功能做准备
// 			req.session.name = account;
// 			res.send(httpResult.success());
// 		}
// 		else res.send(httpResult.failure(null,'密码错误..'));
// 	}
// 	else res.send(httpResult.failure(null,'用户名不存在..'));

module.exports = router;