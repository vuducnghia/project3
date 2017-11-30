var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');

exports.getById = (id, callback) => {
  poolConnection.getConnection((err, connection) => {
    if(err) { return console.log(err); }
    poolConnection.getConnection((err, connection) => {
      const sellectQuery = 'SELECT * FROM ecommerce.admin WHERE idAdmin = ?;';
      connection.query(sellectQuery, [id], (err, results, fields) => {
        const user = results[0];
        if(!user) { return callback({err_msg: 'Khong tim thay admin'}, null) }
        callback(null, user);
      })
      connection.release();
    })
  })
}
