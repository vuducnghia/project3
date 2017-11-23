var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');

// Config here
passport.use('local',new LocalStrategy((username, password, next) => {
  poolConnection.getConnection((err, connection) => {
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
      bcrypt.compare(password, username.password)
      .then((res) => {
        if(res !== true) {
          return next(null, false);
        }
        // delete user.password;
        return next(null, user);
      })
    })
    connection.release();
  })
}))

passport.serializeUser(function(user, next) {
  next(null, user.idUser);
});

passport.deserializeUser(function(id, next) {
  db.users.findById(id, function (err, user) {
    if (err) { return next(err); }
    next(null, user);
  });
});

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return res.json({ error_msg: 'Authenticate failed!' });
};
