var mysql = require('mysql');
var poolConnection = mysql.createPool({
  connectionLimit: 100,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

poolConnection.getConnection((err, connection) => {
  if(err) { return console.log('Conect to database fault. Msg: ', err.sqlMessage); };
  console.log("Your connection to database ready to use!");
  connection.release();
})

module.exports = poolConnection;
