var express = require("express");
var httpResult = require("../config").httpResult;
var query = require("../utils/dbhelper");

var router = express.Router();

router.post("/list", function(req, res, next) {
        var name = req.session.name;
        query("CALL p_getOrderInfo(?);", [ name ])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)))
});

router.post("/delete", function(req, res, next) {
        var id = req.body.id;
        query("CALL p_getOrderInfo(?);", [ name ])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)))
});

module.exports = router;