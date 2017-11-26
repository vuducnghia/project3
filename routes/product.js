var express = require('express');
var router = express.Router();
var poolConnection = require('../models/pool.connection');
var productController = require('../controllers/Product.controller');
var passport = require('passport');


router.get('/subcate/:idSubcate', productController.getBySubCateId);
router.post('/:idProduct', productController.getById);


module.exports = router;
