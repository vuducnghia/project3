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
///////////////////////////// phan quyen
var auth_adminSystem = function auth_adminSystem(req, res, next) {
  console.log(req.user.level)
  if (req.user.level === 1) {
    return next()
  }
  console.log("khong du quyen")
}
function auth_adminSale(req, res, next) {
  console.log(req.user)
  if (req.user.level === 2)
    return next()
  alert("khong du quyen")
}
function auth_adminStore(req, res, next) {
  console.log(req.user)
  if (req.user.level === undefined)
    return next()
}
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/admin/login');
}

function isLoggedForAminSaleIn(req, res, next) {


  if (req.isAuthenticated())
    return next();
  res.redirect('/admin/orders');
}

function isLoggedForAminStoreIn(req, res, next) {

  if (req.isAuthenticated())
    return next();
  // res.redirect('/admin/orders');
}

function isLogout(req, res, next) {
  if (!req.isAuthenticated())
    return next();
  alert('loi')
}

///////////////////////// router client


////////////////////////////////////////////admin max
router.get('/', isLoggedIn, function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/home', { title: 'Express' });
});

router.get('/sign_up', isLoggedIn, function (req, res, next) {  // k can dung nua
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/sign_up', { title: 'Express' });
});

router.get('/login', isLogout, function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/login', { title: 'Express' });
});

router.get('/logout', isLoggedIn, function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/login', { title: 'Express' });
});

router.get('/create_account', isLoggedIn, function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/create_account', { title: 'Express' });
});
/////////////////////////////////////////////// admin store

//User
router.get('/users', isLoggedIn, function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/account/list_users', { title: 'Manage User' });
});



////////////////////##################$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4444
/////////////////////// category
router.get('/categories', isLoggedIn, function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/category', { title: 'Express' });
});

router.get('/categories/:id', isLoggedIn, function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/edit_category', { title: 'Express' });
});

//////////////////////////   Sub category
router.get('/subcategory', isLoggedIn, function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/sub_category', { title: 'Express' });
});

//////////////////////////   product
router.get('/allproduct', isLoggedIn, function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/all_product', { title: 'Express' });
});

router.get('/product_create', isLoggedIn, function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/create_product', { title: 'Express' });
});

router.get('/product/brands', isLoggedIn, function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/brand', { title: 'Brands' });
});

router.get('/product/:id', isLoggedIn, function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/product/create_product', { title: 'Express' });
});



// admin SALE
//Order



router.get('/orders', isLoggedForAminSaleIn, auth_adminSale,function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/admin_sale/listorder', { title: 'Manage Order' });
});
router.get('/orders/:id',isLoggedForAminSaleIn, auth_adminSale, function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/admin_sale/vieworder', {title: 'View Order'});
});

//            ADMIN STORE
router.get('/sale', isLoggedForAminSaleIn, auth_adminSale,function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('admin/admin_store/home', { title: 'Manage Order' });
});


////////////####################################################################33
// router backend

// admin max level
router.post('/sign_up', adminController.sign_up);
router.post('/logout', adminController.logout);
router.post('/login_admin', passport.authenticate('local-admin', { failureRedirect: '/admin/login' }), adminController.login);
router.post('/createAdminStore', auth_adminSystem, adminController.createAdminStore);
// router.post('/createAdminSystemAndSale', adminController.createAdminSystemAndSale);


router.post('/createAdminSystemAndSale', auth_adminSystem, adminController.createAdminSystemAndSale);


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
router.post('/changeActive', userController.changeActive);

/////////////////Order
router.get('/getAllOrders', orderController.getAllOrders);
router.get('/detailOrder/:id', orderController.detailOrder);
router.get('/productOrder/:id', orderController.productOrder);
router.post('/orders/changestatus', orderController.changestatus);