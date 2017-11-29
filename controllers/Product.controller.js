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
