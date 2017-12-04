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

exports.detailOrder = (req, res) => {

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        const sellectQuery = 'SELECT `order`.*, `store`.`name` as name_store, `user`.* FROM `order`, `store`, `user` WHERE `order`.`user_idUser` = `user`.`idUser` and `order`.`store_idstore` = `store`.`idstore` and `order`.`idorder` = ' + req.params.id;
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


exports.productOrder = (req, res) => {

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        const sellectQuery = 'SELECT `store_product`.`product_idProduct`, `product`.`name`, `store_product`.`price`, `op`.`quantity` FROM `order_has_store_product` as `op`, `order`, `store_product`, `product` WHERE `order`.`idorder` = `op`.`order_idorder` and `store_product`.`product_idProduct` = `op`.`store_product_product_idProduct` and `product`.`idProduct` = `store_product`.`product_idProduct` and `order`.`idorder` = ' + req.params.id;
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