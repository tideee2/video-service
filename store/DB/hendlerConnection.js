var mysql = require('mysql');
var connection = require('./connection.js');

handleDisconnect(connection);

function handleDisconnect(client) {
    client.on('error', function (error) {
        if (!error.fatal) return;
        if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

        console.error('> Re-connecting lost MySQL connection: ' + error.stack);

        mysqlClient = mysql.createConnection(client.config);
        handleDisconnect(mysqlClient);
        mysqlClient.connect();
    });
};

exports.connectToDataBase = function() {

    return connection;

};