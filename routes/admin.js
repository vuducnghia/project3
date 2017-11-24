var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin/account.controller');
var poolConnection = require('../models/pool.connection');
var passport = require('passport');


router.get('/sign_up', function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/sign_up', {title: 'Express'});
});
router.get('/login', function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/login', {title: 'Express'});
});

router.post('/sign_up', adminController.sign_up);
router.post('/login', passport.authenticate('local-admin', { failureRedirect: '/admin/login' }), adminController.login);
module.exports = router;