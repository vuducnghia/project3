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

exports.changeActive = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        if (req.body.idadmin_store != undefined) {

            const sellectQuery = "UPDATE `ecommerce`.`admin_store` SET `active`='" + req.body.active + "' WHERE `idadmin_store`='" + req.body.idadmin_store + "';"
            connection.query(sellectQuery, (error, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.json({ err_msg: 'Something wrong! changeActive1' });
                }

                res.json(results);
            });
            connection.release();
        }
        else if (req.body.idadmin != undefined) {
            poolConnection.getConnection((err, connection) => {
                const sellectQuery = "UPDATE `ecommerce`.`admin` SET `active`='" + req.body.active + "' WHERE `idadmin`='" + req.body.idadmin + "';"
                connection.query(sellectQuery, (error, results, fields) => {
                    if (err) {
                        console.log(err);
                        return res.json({ err_msg: 'Something wrong! changeActive 2' });
                    }
                    res.json(results);
                });
                connection.release();
            })
        }
    })

}