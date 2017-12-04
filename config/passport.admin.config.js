var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');
var Admin = require('../models/Admin.model');

// Config here

passport.use('local-admin', new LocalStrategy((username, password, next) => {
  poolConnection.getConnection((err, connection) => {
    if(err) return next(err);
    // console.log('connected as id ' + connection.threadId);
    const sellectQuery = 'SELECT * FROM ecommerce.admin WHERE username = ?;';
    const params = [username];
    connection.query(sellectQuery, params, (err, results, fields) => {
      if (err) {
        return next(err);
      };
      if(!results || results.length === 0) {
        return next(null, false);
      }
      console.log('active account : ')
      console.log(results[0].active)
      if(results[0].active == 0)
        return next(null, false);
      const admin = results[0];
      bcrypt.compare(password, admin.password)
      .then((res) => {
        if(res !== true) {
          return next(null, false);
        }
        // delete user.password;
        return next(null, admin);
      })
    })
    connection.release();
  })
}))

passport.serializeUser(function(admin, next) {
  next(null, admin.idadmin);
});

passport.deserializeUser(function(id, next) {
  Admin.getById(id, (err, admin) => {
    if(err) { return next(err) };
    next(null, admin);
  })
});

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return res.json({ error_msg: 'Authenticate failed!' });
};
