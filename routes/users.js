var express = require('express');
var router = express.Router();
var poolConnection = require('../models/pool.connection');
var userController = require('../controllers/User.controller');
var passport = require('passport');
var passportConfig = require('../config/passport.config');

router.post('/signup', userController.signup);
router.post('/login', passport.authenticate('local') , userController.login);
router.post('/logout', userController.logout);

module.exports = router;
