/**
 * Created by Kevinaskin on 9/9/2016.
 */
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.post('/', function(req, res, next) {
    req.models.user.create({
        username:req.body.username,
        password:req.body.psd,
        type:req.body.typedata
    },function (err, items) {
        if(!err){
            res.json({code:0})
        }else{
            res.json({code:err.errno});
        }
    })
});

module.exports = router;
