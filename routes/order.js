var express = require('express');
var router = express.Router();
var orderController = require('../controllers/Order.controller');

router.post('/dathang', orderController.makeOrder);

module.exports = router;
