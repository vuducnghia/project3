var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin/account.controller');
var poolConnection = require('../models/pool.connection');


router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/sign_up', {title: 'Express'});
});

router.post('/sign_up', adminController.sign_up);
module.exports = router;