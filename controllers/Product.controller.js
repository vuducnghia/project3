var poolConnection = require('../models/pool.connection');
var Product = require('../models/Product.model');

exports.getBySubCateId = (req, res) => {
  const idSubcate = req.params.idSubcate;
  Product.getBySubCateId(idSubcate, (err, products) => {
    if(err) {
      console.log(err);
      return res.json({error_msg: "Some thing wrong when catch products by subcategory id!"});
    }
    res.json({products: products});
  })
}
