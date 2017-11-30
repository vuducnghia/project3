var poolConnection = require('../../models/pool.connection');

exports.getAllSubCategories = (req, res) => {

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        const sellectQuery = 'SELECT sub.* FROM ecommerce.sub_Category sub;';
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

exports.createSubCategory = (req, res) => {
    if (req.body.name == null)
        return res.json({ err_msg: 'Dien day du thong tin ' });

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);

        const sellectQuery0 = 'SELECT sub.* FROM ecommerce.sub_Category sub;';
        connection.query(sellectQuery0, (error, results, fields) => {
            if (err) {
                return res.json({ err_msg: 'Something wrong! createCategory 1' });
            }
            for (var i = 0; i < results.length; ++i) {
                if (req.body.name == results[i].name)
                    return res.json({ err_msg: 'data exsisted!' });
            }

            const sellectQuery ="INSERT INTO `ecommerce`.`sub_Category` (`name`, `category_idCategory`) VALUES ('"+req.body.name + "','"+ req.body.category_idCategory + "');";
            connection.query(sellectQuery, (error, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.json({ err_msg: 'Something wrong! createCategory 2' });
                }
                res.json(results);
            });
        });
        connection.release();
    })
}

exports.deleteSubCategory = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        const sellectQuery = 'DELETE FROM ecommerce.sub_Category  WHERE idSub_Category ="' + req.params.id + '"';
        console.log(sellectQuery)

        connection.query(sellectQuery, (error, results, fields) => {
            if (err) {
                console.log(err);
                return res.json({ err_msg: 'Something wrong! createCategory 2' });
            }
            res.json(results);
        });
        connection.release();
    })
}

exports.updateSubCategory = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        const sellectQuery = "UPDATE `ecommerce`.`sub_Category` SET `name`='"+req.body.name+"' WHERE `idSub_Category`='"+req.body.idSub_Category+"';"
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

exports.getSubCategoryByIdSubCate = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        const sellectQuery = 'SELECT * FROM ecommerce.sub_Category WHERE category_idCategory ="' + req.params.id + '"';
        connection.query(sellectQuery, (error, results, fields) => {
            if (err) {
                console.log(err);
                return res.json({ err_msg: 'Something wrong! createCategory 2' });
            }
            res.json(results);
        });
        connection.release();
    })
}