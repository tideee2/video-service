const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

/* Creates connection to the database */
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'videos'
// });

//Set content directories
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

app.listen("8080", () => {
    console.log("Server works!");
});