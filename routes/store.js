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
router.get('/single/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('single', { title: 'Express' });
});

module.exports = router;
