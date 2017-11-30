var poolConnection = require('../../models/pool.connection');
var bcrypt = require('bcryptjs');
exports.sign_up = (req, res) => {
    const user = {
        username: req.body.username ? req.body.username : null,
        password: req.body.password ? req.body.password : null,
        phone: req.body.phone ? req.body.phone : null
    }

    if (user.username === null || user.password === null || user.phone === null) {
        return res.json({ err_msg: 'Dien day du thong tin username, password va phone!' });
    }

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        // console.log('connected as id ' + connection.threadId);
        const sellectQuery = 'SELECT username, phone FROM ecommerce.admin;';

        connection.query(sellectQuery, (error, results, fields) => {
            if (err) {
                console.log(err);
                return res.json({ err_msg: 'Something wrong!' });
            }

            //Check if have any duplicate infomation
            const duplicateUser = results.filter((userExist) => {
                return user.username === userExist.username || user.phone === userExist.phone;
            });
            if (duplicateUser.length > 0) {
                return res.json({ err_msg: 'User Name or Phone is already existed!' });
            }

            //Hash password and Save to database
            bcrypt.genSalt(10)
                .then((salt) => {
                    return bcrypt.hash(user.password, salt);
                })
                .then((hashPassword) => {
                    const insertQuery = `INSERT INTO ecommerce.admin SET ?`;
                    const escapingValues = {
                        username: user.username,
                        password: hashPassword,
                        phone: user.phone,
                    }
                    connection.query(insertQuery, escapingValues, (err, results, fields) => {
                        if (err) {
                            console.log(err);
                            return res.json({ err_msg: 'Something wrong!' });
                        }
                        return res.json({ msg: 'Signup success!' });
                        res.redirect('/login');
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return res.json({ err_msg: 'Something wrong!' });
                })

        });
        //Release connection back to pool
        connection.release();
    })
}

exports.login = (req, res) => {
    res.json({ admin: req.user });
}

exports.logout = (req, res) => {
    req.logout();
    res.json({ msg: 'You are logout!' });
}

exports.createAdminStore = (req, res) => {
    const account = {
        username: req.body.username ? req.body.username : null,
        password: req.body.password ? req.body.password : null,
        phone: req.body.phone ? req.body.phone : null,
        address: req.body.address ? req.body.address : null
    }
    if (account.username === null || account.password === null || account.phone === null) {
        return res.json({ err_msg: 'Dien day du thong tin username, password va phone!' });
    }

    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);
        const sellectQuery = 'SELECT username FROM ecommerce.admin_store;';

        connection.query(sellectQuery, (error, results, fields) => {
            if (err) {
                console.log(err);
                return res.json({ err_msg: 'Something wrong!' });
            }
            for (var i = 0; i < results.length; ++i) {
                if (results[i].username == account.username)
                    return res.json({ err_msg: 'account existed' });
            }

            const insertQuery = "INSERT INTO `ecommerce`.`admin_store` (`username`, `password`, `phone`, `address`) VALUES ('" + account.username + "', '" + account.password + "', '" + account.phone + "', '" + account.address + "');"
            connection.query(insertQuery, (error, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.json({ err_msg: 'Something wrong!' });
                }
                return res.json(results.insertId);
                // res.redirect('/admin/login');
            })
        })
    })
}

exports.createStore = (req, res) => {
    poolConnection.getConnection((err, connection) => {
        if (err) return console.log(err);

        const sellectQuery = "INSERT INTO `ecommerce`.`store` (`name`) VALUES ('" + req.body.name + "');"
        console.log(sellectQuery);
        connection.query(sellectQuery, (error, results, fields) => {
            if (err) {
                console.log(err);
                return res.json({ err_msg: 'Something wrong!' });
            }
            return res.json({ msg: 'Signup success!' });
            res.redirect('/admin/login');
        })
    })
}