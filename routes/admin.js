var express = require('express');
var router = express.Router();
var mydemo = require("../controllers/testcontroller");
var brandcontroller = require("../controllers/brandcontroller");

router.get('/', function(req, res, next) {
	mydemo.sayhello();
  // mydemo.myalert();
	res.setHeader('Content-Type', 'text/html');
	res.render('index', { title: 'Express', name: mydemo.getname() });
});

module.exports = router;