var express = require('express');
var router = express.Router();
var poolConnection = require('../models/pool.connection');
var userController = require('../controllers/User.controller');
var passport = require('passport');
var passportConfig = require('../config/passport.config');

router.get('/', function(req, res) {
  console.log('req.user: ', req.user);
  if(!req.isAuthenticated()) return res.redirect('/login');
  res.setHeader('Content-Type', 'text/html');
  res.render('trangCaNhan', { title: 'Express' });
});
router.get('/xemLichSuMuaHang', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('xemLichSuMuaHang', { title: 'Express' });
});
router.post('/signup', userController.signup);
router.post('/trangcanhan', userController.xemtrangcanhan);
router.post('/xemlichsumuahang', userController.xemlichsumuahang);
router.post('/guiThongTin', userController.capnhat);
router.post('/login', passport.authenticate('local') , userController.login);
router.post('/logout', userController.logout);

module.exports = router;
