var express = require('express');
var router = express.Router();
var poolConnection = require('../models/pool.connection');
var cateController = require('../controllers/Category.controller');

router.get('/', cateController.getAll);

module.exports = router;
