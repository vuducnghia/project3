var express = require('express');
var router = express.Router();

var adminController = require('../controllers/admin/account.controller');
var categoryController = require('../controllers/admin/category.controller');
var subCategoryController = require('../controllers/admin/subcategory.controller');
var productController = require('../controllers/admin/product.controller');

var poolConnection = require('../models/pool.connection');
var passport = require('passport');

// router client
router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/home', {title: 'Express'});
});

router.get('/sign_up', function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/sign_up', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/login', {title: 'Express'});
});
/////////////////////// category
router.get('/categories', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/category', {title: 'Express'});
});

router.get('/categories/:id', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/edit_category', {title: 'Express'});
});

//////////////////////////   Sub category
router.get('/subcategory', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/sub_category', {title: 'Express'});
});

//////////////////////////   product
router.get('/allproduct', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/all_product', {title: 'Express'});
});

router.get('/product_create', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/create_product', {title: 'Express'});
});

router.get('/product/:id', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/create_product', {title: 'Express'});
});


// router backend


router.post('/sign_up', adminController.sign_up);
router.post('/login', passport.authenticate('local-admin', { failureRedirect: '/admin/login' }), adminController.login);

//////////////////////////////////////////////   CATEGORY
router.get('/getAllCategories', categoryController.getAllCategories);
router.post('/createCategory', categoryController.createCategory);
router.delete('/deleteCategory/:id', categoryController.deleteCategory);

///////////////////////    SubCATEGORY
router.get('/getAllSubCategories', subCategoryController.getAllSubCategories);
router.get('/getSubCategoryByIdCate/:id', subCategoryController.getSubCategoryByIdSubCate);
router.post('/createSubCategory', subCategoryController.createSubCategory);
router.delete('/deleteSubCategory/:id', subCategoryController.deleteSubCategory);

////////////////////////////////////PRODUCT               
router.get('/getAllProduct', productController.getAllProduct);
router.get('/getProductByIdProduct/:id', productController.getProductByIdProduct);
// router.get('/getProductByIdSubCate/:id', productController.getProductByIdSubCate);  chua lams
router.post('/createProduct', productController.createProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.post('/updateProduct/:id', productController.updateProduct);
module.exports = router;
