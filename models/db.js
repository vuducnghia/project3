//mysql
var mysql = require('mysql');
//env
require('dotenv').config();

//connection
var connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')

});

module.exports = connection;