var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');

const getRelationInfoOfProduct = (id, callback) => {
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("Loi 25454353670");
      return callback(err, null);
    }
    const queryString = "SELECT brand_idbrand, sub_Category_idSub_Category FROM ecommerce.product "
      + "where idProduct = ?;";
    connection.query(queryString, [id], (err, results, fields) => {
      if(err) {
        console.log("Loi 01942985y23953");
        return callback(err, null);
      }
      if(!results[0]) return callback(null, null);
      const relationInfo = {
        idBrand: results[0].brand_idbrand,
        idSubcate: results[0].sub_Category_idSub_Category
      }
      return callback(null, relationInfo);
    })
    connection.release();
  })
}

exports.findProductsByName = (query, callback) => {
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("error when get connection when catch products by subcate id");
      return callback(err, null);
    };

    const name = '%'+query+'%';
    const queryString = "SELECT * FROM ecommerce.product p, "
    +"ecommerce.sub_Category s, "
    +"ecommerce.category c, "
    +"ecommerce.brand b, "
    +"ecommerce.imageProduct i, "
    +"ecommerce.store_product st_p, "
    +"ecommerce.store st "
      +"where p.name LIKE ? "
      +"AND s.idSub_Category = p.sub_Category_idSub_Category "
      +"AND c.idCategory = s.category_idCategory "
      +"AND p.brand_idbrand = b.idbrand "
      +"AND p.idProduct = i.product_idProduct "
      +"AND st_p.product_idProduct = p.idProduct "
      +"AND st_p.store_idstore = st.idstore;";
    connection.query({sql: queryString, nestTables: true}, [name], (err, results, fields) =>{
      if(err) {
        console.log('Something wrong when querry products by subcate id!');
        return callback(err, null);
      };
      const products = results.map((result) => {
        return {
          id: result.p.idProduct,
          name: result.p.name,
          code: result.p.code,
          price: result.st_p.price,
          currency: 'USD',
          isStocking: result.st_p.count > 0 ? true : false,
          imageLink: result.i.link_Image,
          brand: {
            id: result.b.idbrand,
            name: result.b.name
          },
          store: {
            id: result.st.idstore,
            name: result.st.name,
          }
        }
      })
      callback(null, products);
    })
    connection.release();
  })
}

exports.getRelationProducts = (idProduct, callback) => {
  const productInfo = {};
  getRelationInfoOfProduct(idProduct, (err, relationInfo) => {
    if(err) {
      return callback(err, null);
    }
    if(!relationInfo) {
      return callback(null, []);
    }
    poolConnection.getConnection((err, connection) => {
      if(err) return callback(err, null);
      const queryString = "SELECT * FROM ecommerce.product p, "
      +"ecommerce.sub_Category s, "
      +"ecommerce.category c, "
      +"ecommerce.brand b, "
      +"ecommerce.imageProduct i, "
      +"ecommerce.store_product st_p, "
      +"ecommerce.store st "
        +"where p.sub_Category_idSub_Category = ? "
        +"AND p.brand_idbrand = ? "
        +"AND s.idSub_Category = p.sub_Category_idSub_Category "
        +"AND c.idCategory = s.category_idCategory "
        +"AND p.brand_idbrand = b.idbrand "
        +"AND p.idProduct = i.product_idProduct "
        +"AND st_p.product_idProduct = p.idProduct "
        +"AND st_p.store_idstore = st.idstore;";
      const queryParams = [relationInfo.idSubcate, relationInfo.idBrand];
      connection.query({sql: queryString, nestTables: true}, queryParams, (err, results, fields) => {
        if(err) return callback(err, null);
        if(!results[0]) return callback(null, []);
        const relationProducts = results.map((result) => {
          return {
            id: result.p.idProduct,
            name: result.p.name,
            code: result.p.code,
            price: result.st_p.price,
            currency: 'USD',
            isStocking: result.st_p.count > 0 ? true : false,
            imageLink: result.i.link_Image,
            brand: {
              id: result.b.idbrand,
              name: result.b.name
            },
            store: {
              id: result.st.idstore,
              name: result.st.name,
            }
          }
        }).filter((product) => {
          return product.id != idProduct;
        })
        callback(null, relationProducts);
      })
      connection.release();
    })
  })
}

exports.getBySubCateId = (idSubcate, callback) => {

  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("error when get connection when catch products by subcate id");
      return callback(err, null);
    };

    const querry = "SELECT * FROM ecommerce.product p, "
    +"ecommerce.sub_Category s, "
    +"ecommerce.category c, "
    +"ecommerce.brand b, "
    +"ecommerce.imageProduct i, "
    +"ecommerce.store_product st_p, "
    +"ecommerce.store st "
      +"where p.sub_Category_idSub_Category = ? "
      +"AND s.idSub_Category = p.sub_Category_idSub_Category "
      +"AND c.idCategory = s.category_idCategory "
      +"AND p.brand_idbrand = b.idbrand "
      +"AND p.idProduct = i.product_idProduct "
      +"AND st_p.product_idProduct = p.idProduct "
      +"AND st_p.store_idstore = st.idstore;";
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
          code: result.p.code,
          // description: result.p.description,
          // accessories: result.p.accessories,
          // product_assuarance_policy: result.p.product_assuarance_policy,
          // month_assuarance: result.p.month_assuarance,
          price: result.st_p.price,
          currency: 'USD',
          isStocking: result.st_p.count > 0 ? true : false,
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
          },
          store: {
            id: result.st.idstore,
            name: result.st.name,
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

    const querry = "SELECT * FROM ecommerce.product p, "
    +"ecommerce.sub_Category s, "
    +"ecommerce.category c, "
    +"ecommerce.brand b, "
    +"ecommerce.imageProduct i, "
    +"ecommerce.store_product st_p, "
    +"ecommerce.store st "
      +"where p.idProduct = ? "
      +"AND s.idSub_Category = p.sub_Category_idSub_Category "
      +"AND c.idCategory = s.category_idCategory "
      +"AND p.brand_idbrand = b.idbrand "
      +"AND p.idProduct = i.product_idProduct "
      +"AND st_p.product_idProduct = p.idProduct "
      +"AND st_p.store_idstore = st.idstore;";
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
          price: result.st_p.price,
          currency: 'USD',
          isStocking: result.st_p.count > 0 ? true : false,
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
          },
          store: {
            id: result.st.idstore,
            name: result.st.name,
          }
        }
      callback(null, product);
    })
    connection.release();
  })
};
