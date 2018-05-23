var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.99.100',
	port: '3306',
    user: 'root',
    password: 'root',
    database: 'video-service'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection Ok!");
});

module.exports = connection;