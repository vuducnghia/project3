var express = require('express');
var router = express.Router();
var poolConnection = require('../models/pool.connection');
var userController = require('../controllers/User.controller');
var passport = require('passport');

router.post('/signup', userController.signup);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }) , userController.login);
router.post('/logout', userController.logout);

module.exports = router;
