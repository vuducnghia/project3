var express = require('express');
var router = express.Router();
var mydemo = require("../controllers/testcontroller");
var brandcontroller = require("../controllers/brandcontroller");
/* GET home page. */
router.get('/', function(req, res, next) {
	mydemo.sayhello();
  // mydemo.myalert();
	res.setHeader('Content-Type', 'text/html');
	res.render('index', { title: 'Express', name: mydemo.getname() });
});
router.get('/login', function(req, res, next) {
	mydemo.sayhello();
  // mydemo.myalert();
	res.setHeader('Content-Type', 'text/html');
	res.render('login', { title: 'Express', name: mydemo.getname() });
});
router.get('/signup', function(req, res, next) {
	mydemo.sayhello();
  // mydemo.myalert();
	res.setHeader('Content-Type', 'text/html');
	res.render('signup', { title: 'Express', name: mydemo.getname() });
});
router.get('/offers', function(req, res, next) {
	mydemo.sayhello();
  // mydemo.myalert();
	res.setHeader('Content-Type', 'text/html');
	res.render('offers', { title: 'Express', name: mydemo.getname() });
});
router.get('/contact', function(req, res, next) {
	mydemo.sayhello();
  // mydemo.myalert();
	res.setHeader('Content-Type', 'text/html');
	res.render('contact', { title: 'Express', name: mydemo.getname() });
});
router.get('/help', function(req, res, next) {
	mydemo.sayhello();
  // mydemo.myalert();
	res.setHeader('Content-Type', 'text/html');
	res.render('help', { title: 'Express', name: mydemo.getname() });
});
router.get('/brand', function(req, res, next) {
 	var brands = brandcontroller.index();
 	res.render('brand', { title: 'Express', brands: brands });
});


module.exports = router;
