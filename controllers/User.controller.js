var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');
var User = require('../models/User.model');

exports.signup = (req, res) => {
  const user = {
    username: req.body.username ? req.body.username : null,
    password: req.body.password ? req.body.password : null,
    email: req.body.email ? req.body.email : null,
    phone: req.body.phone ? req.body.phone : null,
    image: null,
    address: req.body.address ? req.body.address : null
  }

  //Validate request
  if (user.username === null || user.password === null || user.email === null) {
    return res.json({err_msg: 'Dien day du thong tin username, password va email!'});
  }

  //Get a connection from pool
  poolConnection.getConnection((err, connection) => {
    if (err) return console.log(err);
    // console.log('connected as id ' + connection.threadId);
    const sellectQuery = 'SELECT username, email FROM ecommerce.user;';

    connection.query(sellectQuery, (error, results, fields) => {
      if (err) {
        console.log(err);
        return res.json({err_msg: 'Something wrong!'});
      }

      //Check if have any duplicate infomation
      const duplicateUser = results.filter((userExist) => {
        return user.username === userExist.username || user.email === userExist.email;
      });
      if (duplicateUser.length > 0) {
        return res.json({err_msg: 'User Name or Email is already existed!'});
      }

      //Hash password and Save to database
      bcrypt.genSalt(10)
        .then((salt) => {
          return bcrypt.hash(user.password, salt);
        })
        .then((hashPassword) => {
          const insertQuery = `INSERT INTO ecommerce.user SET ?`;
          const escapingValues = {
            username: user.username,
            password: hashPassword,
            email: user.email,
            phone: user.phone,
            address: user.address
          }
          connection.query(insertQuery, escapingValues, (err, results, fields) => {
            if (err) {
              console.log(err);
              return res.json({err_msg: 'Something wrong!'});
            }
            console.log(results);
            return res.json({msg: 'Signup success!'});
            res.redirect('/login');
          });
        })
        .catch((err) => {
          console.log(err);
          return res.json({err_msg: 'Something wrong!'});
        })

    });
    //Release connection back to pool
    connection.release();
  })
}

exports.login = (req, res, next) => {
  // console.log(req);
  // passport.authenticate('local', function(err, user, info) {
  //   console.log('User: ', user);
  //   if (err) { return next(err); }
  //   if (!user) {
  //     console.log('Khong tim thay user');
  //     return res.redirect('/login');
  //   }
  //   req.logIn(user, function(err) {
  //     if (err) {
  //       console.log('Error occus: ', err);
  //       return next(err);
  //     }
  //     // return res.redirect('/');
  //   });
  // })(req, res, next);
  console.log('login controller');
  // console.log('current user: ', req.user);
  if(!req.user) return res.json({errAuthen: 'Xac thuc fail!!!'});
  res.json({user: req.user});


}
exports.logout = (req, res) => {
  req.logout();
  res.json({msg: 'You are out of my system!'});
}
