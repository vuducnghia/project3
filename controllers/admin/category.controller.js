var poolConnection = require('../../models/pool.connection');

exports.getAllCategories = (req, res) => {

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        const sellectQuery = 'SELECT cat.* FROM ecommerce.category cat;';
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

exports.createCategory = (req, res) => {
    if (req.body.name == null)
        return res.json({ err_msg: 'Dien day du thong tin ' });

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);

        const sellectQuery0 = 'SELECT cat.* FROM ecommerce.category cat;';
        connection.query(sellectQuery0, (error, results, fields) => {
            if (err) {
                return res.json({ err_msg: 'Something wrong! createCategory 1' });
            }
            for (var i = 0; i < results.length; ++i) {
                if (req.body.name == results[i].name)
                    return res.json({ err_msg: 'data exsisted!' });
            }

            const sellectQuery = 'INSERT INTO ecommerce.category SET name = "' + req.body.name + '"';

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

exports.deleteCategory = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        const sellectQuery = 'DELETE FROM ecommerce.category  WHERE idCategory ="' + req.params.id + '"';
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

exports.updateCategory = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        const sellectQuery = "UPDATE `ecommerce`.`category` SET `name`='"+req.body.name+"' WHERE `idCategory`='"+req.body.idCategory+"';"
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

exports.getSubCategoryByIdCate = (req, res) => {
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


exports.searchCategory = (req, res) => {

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        const sellectQuery = "SELECT DISTINCT `idCategory`, `category`.`name` FROM `category`, `sub_Category` WHERE `category`.`idCategory`=`sub_Category`.`category_idCategory` AND (`category`.`name` LIKE '%" + req.body.keyword +"%' OR `sub_Category`.`name` LIKE '%" + req.body.keyword +"%')";
        console.log(sellectQuery);
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