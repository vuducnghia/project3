var express = require('express');
var router = express.Router();
var mydemo = require("../controllers/testcontroller");
var brandcontroller = require("../controllers/brandcontroller");
/* GET home page. */
router.get('/', function(req, res, next) {
  mydemo.sayhello();
  // mydemo.myalert();
	res.setHeader('Content-Type', 'text/html');
  res.render('test', { title: 'Express', name: mydemo.getname() });
});

router.get('/brand', function(req, res, next) {
  var brands = brandcontroller.index();
  res.render('brand', { title: 'Express', brands: brands });
});


module.exports = router;
