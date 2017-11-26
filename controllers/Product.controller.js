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
  const idProduct = req.params.idProduct;
  Product.getById(idProduct, (err, product) => {
    if(err) {
      console.log(err);
      return res.json({error_msg: "Some thing wrong when catch product by id!"});
    }
    res.json({product: product});
  })
}
