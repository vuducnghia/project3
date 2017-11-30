var poolConnection = require('../models/pool.connection');

exports.makeOrder = (order, callback) => {
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("Loi asfaf24534yre");
      return callback(err, null);
    }
    connection.release();
  })
}
