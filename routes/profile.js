var express = require('express');
var httpResult = require('../config').httpResult;

var router = express.Router();

router.post('/center',function(req,res,next) {
        var name = req.session.name;
	res.send(httpResult.success(name));
});




module.exports = router;