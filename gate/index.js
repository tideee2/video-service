const express = require('express');
const app = express();
const path = require('path');

/* Set content directories for static file server */
// Page
app.get('/', function (req, res) {
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

app.listen("3000", () => {
    console.log("Server works!");
});