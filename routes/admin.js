var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/sign_up', {title: 'Express'});
});

module.exports = router;