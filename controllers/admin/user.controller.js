var poolConnection = require('../../models/pool.connection');

exports.getAllUsers = (req, res) => {
    var list_users;
    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        const sellectQuery = 'SELECT * FROM ecommerce.admin;';
        connection.query(sellectQuery, (error, results, fields) => {
            if (err) {
                console.log(err);
                return res.json({ err_msg: 'Something wrong! ecommerce.admin' });
            }
            list_users = results;

            const sellectQuery1 = 'SELECT * FROM ecommerce.admin_store;';
            connection.query(sellectQuery1, (error, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.json({ err_msg: 'Something wrong! ecommerce.admin_store' });
                }
                
                list_users = list_users.concat(results);
                res.json(list_users);
            });
            connection.release();
        })
    })
}