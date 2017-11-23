var mysql = require('mysql');
var poolConnection  = mysql.createPool({
  connectionLimit : 100,
  port: 3306,
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
