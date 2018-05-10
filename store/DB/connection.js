var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'video-servise'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection Ok!");
});

module.exports = connection;