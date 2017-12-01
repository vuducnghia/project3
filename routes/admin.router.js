var express = require('express');
var router = express.Router();

var adminController = require('../controllers/admin/account.controller');
var categoryController = require('../controllers/admin/category.controller');
var subCategoryController = require('../controllers/admin/subcategory.controller');
var productController = require('../controllers/admin/product.controller');
var brandController = require('../controllers/admin/brand.controller');
var userController = require('../controllers/admin/user.controller');
var orderController = require('../controllers/admin/order.controller');

var poolConnection = require('../models/pool.connection');
var passport = require('passport');

// router client
////////////////////////////////////////////admin
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

router.get('/create_account_store', function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/create_account_store', {title: 'Express'});
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

router.get('/product/brands', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/brand', {title: 'Brands'});
});

router.get('/product/:id', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/create_product', {title: 'Express'});
});

//User
router.get('/users', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/user/list', {title: 'Manage User'});
});


//Order
router.get('/orders', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/order/listorder', {title: 'Manage Order'});
});


// router backend

// admin max level
router.post('/sign_up', adminController.sign_up);
router.post('/login', passport.authenticate('local-admin', { failureRedirect: '/admin/login' }), adminController.login);

router.post('/createAdminStore', adminController.createAdminStore);
router.post('/createStore', adminController.createStore);

//////////////////////////////////////////////   CATEGORY
router.get('/getAllCategories', categoryController.getAllCategories);
router.post('/createCategory', categoryController.createCategory);
router.delete('/deleteCategory/:id', categoryController.deleteCategory);
router.post('/updateCategory/:id', categoryController.updateCategory);
router.post('/searchCategory', categoryController.searchCategory);

///////////////////////    SubCATEGORY
router.get('/getAllSubCategories', subCategoryController.getAllSubCategories);
router.get('/getSubCategoryByIdCate/:id', subCategoryController.getSubCategoryByIdSubCate);
router.post('/createSubCategory', subCategoryController.createSubCategory);
router.delete('/deleteSubCategory/:id', subCategoryController.deleteSubCategory);
router.post('/updateSubCategory/:id', subCategoryController.updateSubCategory);

////////////////////////////////////PRODUCT               
router.get('/getAllProduct', productController.getAllProduct);
router.get('/getProductByIdProduct/:id', productController.getProductByIdProduct);
// router.get('/getProductByIdSubCate/:id', productController.getProductByIdSubCate);  chua lams
router.post('/createProduct', productController.createProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.post('/updateProduct/:id', productController.updateProduct);
module.exports = router;

////////////////Brands
router.get('/getAllBrands', brandController.getAllBrands);
router.post('/updateBrand', brandController.updateBrand);
router.post('/createBrand', brandController.createBrand);

/////////////////user
router.get('/getAllUsers', userController.getAllUsers);

/////////////////Order
router.get('/getAllOrders', orderController.getAllOrders);