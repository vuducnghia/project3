var mysql = require('mysql');
<<<<<<< HEAD
var poolConnection  = mysql.createPool({
  connectionLimit : 100,
  port: 3306,
=======
var poolConnection = mysql.createPool({
  connectionLimit: 100,
>>>>>>> 30f2a1105ec636e7c3525f5b2b206b65eafdbfc1
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

poolConnection.getConnection((err, connection) => {
  if(err) {
    console.log('Conect to database fault. Msg: ', err);
    return console.log('Try to change your host to 127.0.0.1 instead of localhost!');
  };
  console.log("Your connection to database ready to use!");
  connection.release();
})

module.exports = poolConnection;
