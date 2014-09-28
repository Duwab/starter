var mysql = require('mysql');
var dbconfig = require('./config.js');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports  = connection;