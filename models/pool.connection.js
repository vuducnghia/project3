var mysql = require('mysql');
var poolConnection = mysql.createPool({
  connectionLimit: 100,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

module.exports = poolConnection;
