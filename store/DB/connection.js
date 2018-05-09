var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection Ok!");
});

module.exports = connection;