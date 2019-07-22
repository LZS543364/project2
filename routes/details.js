var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');


var router = express.Router();


router.post('/',function(req,res,next) {
        var id = parseInt(req.body.id);
        query('SELECT * FROM `dt_product` WHERE `id` = ?;', [id])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null,message)));
});



module.exports = router;