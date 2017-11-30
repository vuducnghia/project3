var poolConnection = require('../../models/pool.connection');

exports.getAllBrands = (req, res) => {

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        const sellectQuery = 'SELECT brand.* FROM ecommerce.brand;';
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
