var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/regist',function (req,res) {
  res.render('regist',{title:'Regist'})
});


module.exports = router;
