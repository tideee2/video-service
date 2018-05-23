var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
	port: '3306',
    user: 'root',
    password: 'root',
    database: 'video_service'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection Ok!");
});

module.exports = connection;