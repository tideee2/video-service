const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
let arrVideo = [];

io.on('connection', function (socket) {
    console.log("User connected!");
    /*let userObj = {socked: socket.id, user: undefined, video: undefined, time: undefined};
    arrVideo.push(userObj);

    socket.on('disconnect', function () {
        var position = arrVideo.find(x => x.id == socked.id);
        if (arrVideo[position].time == undefined) {
            var sql = "INSERT INTO video (user, video, time) VALUES('" + values.user + "', '" + values.video + "', '" + arrVideo[position].time + "' )";
            connection.query(sql, function (err, result) {
                if (err) throw err;
            });
        }
    });*/
});

/* Creates connection to the database */
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'videos'
// });

/* Set content directories for static file server */
// Pages
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/login.html'));
});
app.get('/watch', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
// Files
app.get('/css/reset.css', (req, res) => {
    res.setHeader('content-type', 'text/css');
    res.sendFile(path.join(__dirname + '/css/reset.css'));
});
app.get('/css/style.css', (req, res) => {
    res.setHeader('content-type', 'text/css');
    res.sendFile(path.join(__dirname + '/css/style.css'));
});
app.get('/js/main.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/main.js'));
});
app.get('/js/login.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/login.js'));
});

http.listen("3000", () => {
    console.log("Server works!");
});