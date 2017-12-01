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

exports.createBrand = (req, res) => {
    if (req.body.name == null)
        return res.json({ err_msg: 'Dien day du thong tin ' });

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);

        const sellectQuery0 = 'SELECT * FROM ecommerce.brand;';
        connection.query(sellectQuery0, (error, results, fields) => {
            if (err) {
                return res.json({ err_msg: 'Something wrong! createBrand 1' });
            }
            for (var i = 0; i < results.length; ++i) {
                if (req.body.name == results[i].name)
                    return res.json({ err_msg: 'data exsisted!' });
            }

            const sellectQuery = 'INSERT INTO ecommerce.brand SET name = "' + req.body.name + '"';

            connection.query(sellectQuery, (error, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.json({ err_msg: 'Something wrong! createBrand 2' });
                }
                res.json(results);
            });
        });
        connection.release();
    })
}

exports.updateBrand = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        const sellectQuery = "UPDATE `ecommerce`.`brand` SET `name`='"+req.body.name+"' WHERE `idbrand`='"+req.body.idbrand+"';"
        connection.query(sellectQuery, (error, results, fields) => {
            if (err) {
                console.log(err);
                return res.json({ err_msg: 'Something wrong! get product 2' });
            }

            res.json(results);
        });
        connection.release();
    })
}