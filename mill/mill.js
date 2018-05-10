var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var mysql      = require('mysql');
var app = express();

var jsonParser = bodyParser.json();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '',
   database : 'video-service'
 });

app.get('/',function(request, response){
    response.sendFile(__dirname + '/mill.html');
})

app.get('/mill',function(request, response){ 
    console.log();
    response.send('hello');
})
app.post("/api/tasks",jsonParser,(request,response)=>{
    console.log('111');
    console.log((request.body.id));
    var query = "SELECT * FROM `"+tableName+ "` WHERE `owner`="+request.body.id;
    connection.query(query, function(err, rows) {
        if (err) throw err;
        response.send(rows)    
    });
});
app.listen(3100);