var poolConnection = require('../../models/pool.connection');

exports.getAllOrders = (req, res) => {

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        const sellectQuery = 'SELECT `order`.*, `store`.`name` as name_store, `user`.`username` as name_customer FROM `order`, `store`, `user` WHERE `order`.`user_idUser` = `user`.`idUser` and `order`.`store_idstore` = `store`.`idstore`';
        connection.query(sellectQuery, (error, results, fields) => {
            if (err) {
                console.log(err);
                return res.json({ err_msg: 'Something wrong!' });
            }
            res.json(results);
        });
        connection.release();
    })
}