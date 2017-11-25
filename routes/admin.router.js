var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin/account.controller');
var productController = require('../controllers/admin/product.controller')
var poolConnection = require('../models/pool.connection');
var passport = require('passport');

// router client
router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/home', {title: 'Express'});
});

router.get('/sign_up', function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/sign_up', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/login', {title: 'Express'});
});

router.get('/categories', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/category', {title: 'Express'});
});




// router backend


router.post('/sign_up', adminController.sign_up);
router.post('/login', passport.authenticate('local-admin', { failureRedirect: '/admin/login' }), adminController.login);
router.get('/getAllCategories', productController.getAllCategories);



module.exports = router;
