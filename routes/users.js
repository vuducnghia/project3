var express = require('express');
var router = express.Router();
var poolConnection = require('../models/pool.connection');
var userController = require('../controllers/User.controller');

router.post('/signup', userController.signup);

module.exports = router;
