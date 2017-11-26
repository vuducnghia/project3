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
    console.log(11);
    console.log(req.body.nameCategory);
    // console.log(req.body)
    // if(req.body.nameCategory == null)
    //     return res.json({ err_msg: 'Dien day du thong tin ' });

    // poolConnection.getConnection((err, connection) => {
    //     if (err) return console.log(err);
    //     const sellectQuery = 'INSERT INTO ecommerce.category SET ?';
    //     const category = {
    //         name : req.body.nameCategory
    //     }
    //     connection.query(sellectQuery, (error, results, fields) => {
    //         if (err) {
    //             console.log(err);
    //             return res.json({ err_msg: 'Something wrong!' });
    //         }
    //         res.json(results);
    //     });
    //     connection.release();
    // })
}