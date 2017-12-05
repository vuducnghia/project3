"use strict";
var poolConnection = require('../models/pool.connection');
var Product = require('../models/Product.model');

exports.getBySubCateId = (req, res) => {
  const idSubcate = req.params.idSubcate;
  console.log('idSubcate');
  console.log(idSubcate);
  Product.getBySubCateId(idSubcate, (err, products) => {
    if(err) {
      console.log(err);
      return res.json({error_msg: "Some thing wrong when catch products by subcategory id!"});
    }
    res.json({products: products});
  })
}

exports.getById = (req, res) => {
  console.log('vllllllllll');
  const idProduct = req.params.idProduct;
  const idStore = req.params.idStore;
  Product.getById(idProduct, idStore, (err, product) => {
    if(err) {
      console.log(err);
      return res.json({error_msg: "Some thing wrong when catch product by id!"});
    }
    res.json({product: product});
  })
}

exports.findProductsByName = (req, res) => {
  const query = req.body.query.replace(/\s\s+/g, ' ').trim();
  console.log('Query: ', query);
  Product.findProductsByName(query, (err, products) => {
    if(err) {
      console.log(err);
      return res.json({error_msg: "Some thing wrong when find products by name!"});
    }
    res.json({products: products});
  })
}

exports.getRelationProducts = (req, res) => {
  console.log('Vao getRelationProducts');
  const idProduct = req.params.idProduct;
  if(!idProduct) {
    console.log('Khong doc duoc params.idProduct');
    return res.json({product: []});
  }
  Product.getRelationProducts(idProduct, (err, relationProducts) => {
    if(err) {
      console.log(err);
      return res.json({error_msg: "Some thing wrong when find relation products!"});
    }
    let count = 0;
    const fiveRelationProducts = relationProducts.filter((product) => {
      count ++;
      return count <= 5;
    })
    res.json({products: fiveRelationProducts});
  })
}

exports.reviewProduct = (req, res) => {
  console.log('Im heeeeeereeeeeee');
  console.log('req.user: ', req.user);
  if(!req.user || !req.isAuthenticated()) return res.json({error_msg: "Can dang nhap!", isAuthenticated: false});
  const review = {
    idUser: req.user.idUser,
    idStore: req.body.maCuaHang,
    idProduct: req.body.maSanPham,
    content: req.body.userReview,
    rate: req.body.rate
  }
  console.log('review: ', review);
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log(err);
      return res.json({error_msg: "Some thing wrong when connect to DB when review!!"})
    }
    const queryString = "INSERT INTO `ecommerce`.`review_product` "
    +"(`user_idUser`, `store_product_store_idstore`, `store_product_product_idProduct`, `content`, `rate`) "
    +"VALUES (?, ?, ?, ?, ?);";
    const params = [review.idUser, review.idStore, review.idProduct, review.content, review.rate];
    connection.query({sql: queryString}, params, (err, results, fields) => {
      if(err) {
        console.log(err);
        if(err.code == 'ER_DUP_ENTRY') return res.json({error_msg: "Ban da review san pham nay roi!"})
        return res.json({error_msg: "Some thing wrong when review!!"})
      }
      res.json({msg: 'Review success!'});
    })
    connection.release();
  })
}

exports.soSanhSanPham = (req, res) => {
  const idProduct = req.params.idProduct;
  const idStore1 = req.params.idStore1;
  const nameProduct = req.params.nameProduct;
  Product.findProductsByName(nameProduct, (err, products) => {
    if(err) return console.log(err);
    const idProductCompare = products[0].id;
    const idStore2 = products[0].store.id;

    Product.compare2Products(idProduct, idStore1, idProductCompare, idStore2, (err, compareResult) => {
      if(err) {
        console.log(err);
        return res.json({error_msg: 'St wrong when compare 2 products!!!'})
      }
      return res.json({compareResult: compareResult});
    })
  })
}

exports.addToWishlist = (req, res) => {
  if(!req.isAuthenticated()) {
    return res.json({isAuthenticated: false, error_msg: "Ban chua dang nhap"});
  }
  const product = req.body.product;
  const user = req.user;
  console.log('req.product: ', product);
  console.log('req.user: ', user);
  Product.addToWishlist(product, user, (err, result) => {
    if(err) return res.json({error_msg: "Them vao yeu thich khong thanh cong"});
    return res.json({msg: "Them vao yeu thich thanh cong"});
  })
}

exports.getReviews = (req, res) => {
  const idProduct = req.body.idProduct;
  const idStore = req.body.idStore;

  Product.getReviews(idProduct, idStore, (err, results) => {
    if(err) return res.json({err});
    return res.json({reviews: results});
  })
}
