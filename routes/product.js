var express = require('express');
var router = express.Router();
var poolConnection = require('../models/pool.connection');
var productController = require('../controllers/Product.controller');
var passport = require('passport');


router.post('/subcate/:idSubcate', productController.getBySubCateId);
router.post('/sosanh/:idProduct/:idStore1/:nameProduct', productController.soSanhSanPham);
router.post('/sanphamlienquan/:idProduct', productController.getRelationProducts);
router.post('/them-vao-yeu-thich', productController.addToWishlist);
router.post('/phanhoisanpham', productController.reviewProduct);
router.post('/timkiemsanpham', productController.findProductsByName);
router.post('/get-reviews', productController.getReviews);
router.post('/:idProduct/:idStore', productController.getById);


module.exports = router;
