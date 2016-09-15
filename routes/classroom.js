/**
 * Created by Kevinaskin on 9/9/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.currentUser) {
        res.render('classroom', {title: 'Classroom'});
    } else {
        res.redirect('/');
    }

});

router.get('/teacher', function (req, res, next) {
    if (req.session.currentUser) {
        res.render('admin', {title: 'Teacher admin'});
    } else {
        res.redirect('/');
    }

});
router.post('/t-info', function (req, res) {
    req.models.classlist.find({teacherid: req.body.teacherid}, function (err, item) {
        if (item[0]) {
            console.log(item);
        } else {
            res.json(item);
        }
    })
});

module.exports = router;
