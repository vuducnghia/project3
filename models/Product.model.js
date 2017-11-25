var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');

exports.getBySubCateId = (idSubcate, callback) => {

  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("error when get connection when catch products by subcate id");
      return callback(err, null);
    };

    const querry = "SELECT * FROM ecommerce.product, ecommerce.sub_category, ecommerce.category, ecommerce.brand where sub_Category_idSub_Category = ? AND idSub_Category = ? AND idCategory = category_idCategory;";
    const params = [idSubcate, idSubcate];

    connection.query({sql: querry, nestTables: true}, params, (err, results, fields) => {
      if(err) {
        console.log('Something wrong when querry products by subcate id!');
        return callback(err, null);
      };
      const products = results.map((result) => {
        return {
          id: result.product.idProduct,
          name: result.product.name,
          code: result.product.code,
          description: result.product.description,
          accessories: result.product.accessories,
          product_assuarance_policy: result.product.product_assuarance_policy,
          month_assuarance: result.product.month_assuarance,
          sub_category: {
            id: result.sub_category.idSub_Category,
            name: result.sub_category.name
          },
          category: {
            id: result.category.idCategory,
            name: result.category.name
          },
          brand: {
            id: result.brand.idbrand,
            name: result.brand.name
          }
        }
      })
      callback(null, products);
    })
    connection.release();
  })
};
