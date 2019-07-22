var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');


var router = express.Router();


router.post('/list',function(req,res,next) {
	var cid = parseInt(req.body.cid);
	// var begin = parseInt(req.body.begin);
	// var count = parseInt(req.body.count);
        query('SELECT * FROM `dt_product` WHERE `cid` = ?;', [cid])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null,message)));
});

module.exports = router;