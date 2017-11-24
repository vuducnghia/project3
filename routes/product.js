var express = require('express');
var router = express.Router();
var poolConnection = require('../models/pool.connection');
var userController = require('../controllers/Product.controller');
var passport = require('passport');

// router.post('/product/', userController.signup);

module.exports = router;
