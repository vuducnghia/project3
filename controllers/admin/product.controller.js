var poolConnection = require('../../models/pool.connection');


exports.getAllProduct = (req, res) => {

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        const sellectQuery = 'SELECT pro.* FROM ecommerce.product pro;';
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

exports.createProduct = (req, res) => {
    if (req.body.name == null)
        return res.json({ err_msg: 'Dien day du thong tin ' });

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);

        const sellectQuery0 = 'SELECT pro.* FROM ecommerce.product pro;';
        connection.query(sellectQuery0, (error, results, fields) => {
            if (err) {
                return res.json({ err_msg: 'Something wrong! createproduct 1' });
            }
            for (var i = 0; i < results.length; ++i) {
                if (req.body.name == results[i].name)
                    return res.json({ err_msg: 'data exsisted!' });
            }

            const sellectQuery ="INSERT INTO `ecommerce`.`product` (`name`, `code`, `description`, `accessories`, `sub_Category_idSub_Category`, `product_assuarance_policy`, `month_assuarance`, `brand_idbrand`) VALUES ('"+req.body.name + "','"+ req.body.code + "','"+ req.body.description + "','"+ req.body.accessories + "','"+ req.body.sub_Category_idSub_Category + "','"+ req.body.product_assuarance_policy + "','"+ req.body.month_assuarance + "','"+ req.body.brand_idbrand + "');";
            connection.query(sellectQuery, (error, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.json({ err_msg: 'Something wrong! createproduct 2' });
                }
                res.json(results);
            });
        });
        connection.release();
    })
}

exports.deleteProduct = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        const sellectQuery = 'DELETE FROM ecommerce.product  WHERE idProduct ="' + req.params.id + '"';
        console.log(sellectQuery)

        connection.query(sellectQuery, (error, results, fields) => {
            if (err) {
                console.log(err);
                return res.json({ err_msg: 'Something wrong! deleteProduct 2' });
            }
            res.json(results);
        });
        connection.release();
    })
}

exports.getProductByIdProduct = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        const sellectQuery = 'SELECT * FROM ecommerce.product WHERE idProduct ="' + req.params.id + '"';
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

exports.updateProduct = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        const sellectQuery = "UPDATE `ecommerce`.`product` SET `name`='"+req.body.name+"', `description`='"+req.body.description+"', `accessories`='"+req.body.accessories+"', `sub_Category_idSub_Category`='"+req.body.sub_Category_idSub_Category+"', `product_assuarance_policy`='"+req.body.product_assuarance_policy+"', `month_assuarance`='"+req.body.month_assuarance+"', `brand_idbrand`='"+req.body.brand_idbrand+"' WHERE `idProduct`='"+req.body.idProduct+"';"
        connection.query(sellectQuery, (error, results, fields) => {
            if (err) {
                console.log(err);
                return res.json({ err_msg: 'Something wrong! get product 2' });
            }
            console.log(sellectQuery)
            res.json(results);
        });
        connection.release();
    })
}
