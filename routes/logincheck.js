/**
 * Created by Kevinaskin on 9/9/2016.
 */
var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    req.models.user.find({username: req.body.username}, function (err, item) {
        if (item[0]) {
            if (item[0].password == req.body.psd) {
                req.session.currentUser = item[0].username;
                req.session.currentType = item[0].type;
                if (item[0].type == 'student') {
                    res.json({code: 0, msg: 'Student login success'});
                } else {
                    if (req.session.loginClient == 'nwjs') {
                        res.json({code:4,msg:'Teacher login by Nwjs-Client'});
                    } else {
                        res.json({code: 3, msg: 'Teacher login success'});
                    }
                }

            } else {
                res.json({code: 1, msg: 'wrong password'});
            }
        } else {
            res.json({code: 2, msg: 'wrong username'});
        }

    });

});

module.exports = router;
