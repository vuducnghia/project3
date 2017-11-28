var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');

exports.findProductsByName = (query, callback) => {
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("error when get connection when catch products by subcate id");
      return callback(err, null);
    };

    const name = query;
    const queryString = "SELECT * FROM ecommerce.product p, ecommerce.sub_Category s, ecommerce.category c, ecommerce.brand b, ecommerce.imageProduct i "
    +"where p.name = ? AND "
    +"s.idSub_Category = p.sub_Category_idSub_Category AND "
    +"c.idCategory = s.category_idCategory AND "
    +"p.brand_idbrand = b.idbrand AND "
    +"p.idProduct = i.product_idProduct;";
    connection.query({sql: queryString, nestTables: true}, [name], (err, results, fields) =>{
      if(err) {
        console.log('Something wrong when querry products by subcate id!');
        return callback(err, null);
      };
      const products = results.map((result) => {
        return {
          id: result.p.idProduct,
          name: result.p.name,
          price: 1000,
          currency: 'USD',
          imageLink: result.i.link_Image,
          brand: {
            id: result.b.idbrand,
            name: result.b.name
          }
        }
      })
      products.push({
          id: results[0].p.idProduct,
          name: results[0].p.name,
          price: 1000,
          currency: 'USD',
          imageLink: results[0].i.link_Image,
          brand: {
            id: results[0].b.idbrand,
            name: results[0].b.name
          }
      });
      products.push({
          id: results[0].p.idProduct,
          name: results[0].p.name,
          price: 1000,
          currency: 'USD',
          imageLink: results[0].i.link_Image,
          brand: {
            id: results[0].b.idbrand,
            name: results[0].b.name
          }
      });
      callback(null, products);
    })
    connection.release();
  })
}

exports.getBySubCateId = (idSubcate, callback) => {

  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("error when get connection when catch products by subcate id");
      return callback(err, null);
    };

    const querry = "SELECT * FROM ecommerce.product p, ecommerce.sub_Category s, ecommerce.category c, ecommerce.brand b, ecommerce.imageProduct i where p.sub_Category_idSub_Category = ? AND s.idSub_Category = p.sub_Category_idSub_Category AND c.idCategory = s.category_idCategory AND p.brand_idbrand = b.idbrand AND p.idProduct = i.product_idProduct;";
    const params = [idSubcate];

    connection.query({sql: querry, nestTables: true}, params, (err, results, fields) => {
      if(err) {
        console.log('Something wrong when querry products by subcate id!');
        return callback(err, null);
      };
      const products = results.map((result) => {
        return {
          id: result.p.idProduct,
          name: result.p.name,
          // code: result.p.code,
          // description: result.p.description,
          // accessories: result.p.accessories,
          // product_assuarance_policy: result.p.product_assuarance_policy,
          // month_assuarance: result.p.month_assuarance,
          price: 1000,
          currency: 'USD',
          imageLink: result.i.link_Image,
          // sub_category: {
          //   id: result.s.idSub_Category,
          //   name: result.s.name
          // },
          // category: {
          //   id: result.c.idCategory,
          //   name: result.c.name
          // },
          brand: {
            id: result.b.idbrand,
            name: result.b.name
          }
        }
      })
      callback(null, products);
    })
    connection.release();
  })
};

exports.getById = (idProduct, callback) => {
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("error when get connection when catch product by id");
      return callback(err, null);
    };

    const querry = "SELECT * FROM ecommerce.product p, ecommerce.sub_Category s, ecommerce.category c, ecommerce.brand b, ecommerce.imageProduct i where p.idProduct = ? AND s.idSub_Category = p.sub_Category_idSub_Category AND c.idCategory = s.category_idCategory AND p.brand_idbrand = b.idbrand AND p.idProduct = i.product_idProduct;";
    const params = [idProduct];

    connection.query({sql: querry, nestTables: true}, params, (err, results, fields) => {
      if(err) {
        console.log('Something wrong when querry products by subcate id!');
        return callback(err, null);
      };
      if(!results[0]) {
        callback(err, null);
      }
      const result = results[0];
      const product = {
          id: result.p.idProduct,
          name: result.p.name,
          code: result.p.code,
          description: result.p.description,
          accessories: result.p.accessories,
          product_assuarance_policy: result.p.product_assuarance_policy,
          month_assuarance: result.p.month_assuarance,
          price: 1000,
          currency: 'USD',
          imageLink: result.i.link_Image,
          sub_category: {
            id: result.s.idSub_Category,
            name: result.s.name
          },
          category: {
            id: result.c.idCategory,
            name: result.c.name
          },
          brand: {
            id: result.b.idbrand,
            name: result.b.name
          }
        }
      callback(null, product);
    })
    connection.release();
  })
};
