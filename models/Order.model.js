var poolConnection = require('../models/pool.connection');

exports.makeOrder = (order, user, callback) => {
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("Loi 36456rhfhe");
      return callback(err, null);
    }
    console.log("orderInfo: ", order);
    const queryString = "INSERT INTO `ecommerce`.`order` (`name`, `totalPrice`, `shipping_Address`, `user_idUser`, `store_idstore`, `status`) VALUES (?, ?, ?, ?, ?, ?);"
    const params = [
      order.customerInfo.name,
      order.totalPrice,
      order.customerInfo.address,
      user.idUser,
      order.storeId,
      0
    ];
    connection.query({sql: queryString}, params, (err, results, fields) => {
      if(err) {
        console.log(err);
      }
      console.log('results.insertId: ', results.insertId);
      order.items.forEach((item) => {
        makeOrder_Store_Product(results.insertId, order.storeId, item.idProduct, item.quantity);
      })
    })
    connection.release();
  })
}

const makeOrder_Store_Product = (order_idorder, store_product_store_idstore, store_product_product_idProduct, quantity) => {
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("Loi 36456rhfhe");
      return callback(err, null);
    }
    const queryString = "INSERT INTO `ecommerce`.`order_has_store_product` (`order_idorder`, `store_product_store_idstore`, `store_product_product_idProduct`, `quantity`) VALUES (?, ?, ?, ?);";
    const params = [
      order_idorder,
      store_product_store_idstore,
      store_product_product_idProduct,
      quantity
    ]
    connection.release();
  })
}
