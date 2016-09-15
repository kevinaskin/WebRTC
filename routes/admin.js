/**
 * Created by Kevinaskin on 9/11/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    req.models.user.find({username: req.body.studentid, type: 'student'}, function (err, item) {
        if (item[0]) {
            req.models.classlist.find({
                teacherid: req.session.currentUser,
                studentid: req.body.studentid
            }, function (err, item) {
                if (item.length) {
                    res.json({code: 2, msg: "Already added"})
                } else {
                    req.models.classlist.create({
                        teacherid: req.session.currentUser,
                        studentid: req.body.studentid
                    }, function (err, item) {
                        if (!err) {
                            res.json({code: 0, studentid: req.body.studentid, currentUser: req.session.currentUser});
                        } else {
                            res.json({err: err});
                        }
                    });
                }
            })


        } else {
            res.json({code: 1, msg: 'There is no such student'});
        }
    })
});
router.post('/list', function (req, res) {
    req.models.classlist.find({teacherid: req.body.teacherid}, function (err, item) {
        res.json(item);
    })
});
router.post('/currentUser', function (req, res) {
    res.json({currentUser: req.session.currentUser});
});


router.post('/del', function (req, res, next) {
    req.models.user.find({username: req.body.studentid, type: 'student'}, function (err, item) {
        if (item[0]) {
            req.models.classlist.find({
                teacherid: req.session.currentUser,
                studentid: req.body.studentid
            }, function (err, item) {
                if (item.length) {
                    req.models.classlist.find({
                        teacherid: req.session.currentUser,
                        studentid: req.body.studentid
                    }).remove(function (err) {
                        if (!err) {
                            res.json({code:4,msg:'Removed success',currentUser:req.session.currentUser});
                        }else{
                            res.json({code:5,err:err});
                        }

                    })
                } else {
                    res.json({code: 3, msg: 'There is no such student in your classroom.'});
                }
            })


        } else {
            res.json({code: 1, msg: 'There is no such student'});
        }
    })
});

module.exports = router;
