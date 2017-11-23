var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');

// Config here

passport.use('local', new LocalStrategy((username, password, next) => {

  poolConnection.getConnection((err, connection) => {
    console.log('Search userrrrrrr');
    if(err) return next(err);
    // console.log('connected as id ' + connection.threadId);
    const sellectQuery = 'SELECT * FROM ecommerce.user WHERE username = ?;';
    const params = [username];
    connection.query(sellectQuery, params, (err, results, fields) => {
      if (err) {
        return next(err);
      };
      if(!results || results.length === 0) {
        return next(null, false);
      }
      const user = results[0];
      console.log('user catched: ', user);
      bcrypt.compare(password, user.password)
      .then((res) => {
        if(res !== true) {
          console.log('password incorrect');
          return next(null, false);
        }
        // delete user.password;
        console.log('password correct');
        connection.release();
        return next(null, user);
      })
    })
  })
}))

passport.serializeUser(function(user, next) {
  console.log('serializeUser');
  next(null, user.idUser);
});

passport.deserializeUser(function(id, next) {
  console.log('deserializeUser');
  // db.users.findById(id, function (err, user) {
  //   if (err) { return next(err); }
  //   next(null, user);
  // });
  poolConnection.getConnection((err, connection) => {
    const sellectQuery = 'SELECT * FROM ecommerce.user WHERE idUser = ?;';
    connection.query(sellectQuery, [id], (err, results, fields) => {
      const user = results[0];
      if(user) {
        console.log('deserialize User!!!');
        next(null, user);
      }
    })
    connection.release();
  })
});

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return res.json({ error_msg: 'Authenticate failed!' });
};
