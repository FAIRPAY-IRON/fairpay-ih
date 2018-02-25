var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {title: 'Fairpay', user: req.user});
});

/* GET About Us page. */
router.get('/aboutus', function(req, res) {
  res.render('about-us');
});

module.exports = router;
