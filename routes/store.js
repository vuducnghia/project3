var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('login', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('signup', { title: 'Express' });
});
router.get('/offers', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('offers', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('contact', { title: 'Express' });
});
router.get('/help', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('help', { title: 'Express' });
});
router.get('/gioHang', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('gioHang', { title: 'Express' });
});
router.get('/xacNhanDatHang', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('xacNhanDatHang', { title: 'Express' });
});
router.get('/single/:idProduct/:idStore', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('single', { title: 'Express' });
});
router.get('/soSanh/:idProduct1/:tenProduct2', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('soSanhSanPham', { title: 'Express' });
});

module.exports = router;
