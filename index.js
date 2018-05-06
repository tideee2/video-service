
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
 const maxDuration = 40*60;
 const relativeDuration = 0.15;
 const relativeDuration1 = 0.85;
 const x_end = 2;
 const y_end = 2.42;
 const shift = 1;
 const p3 = 3;
 const p5 = 5;
 //const for video Ratio
 const magicNumber1 = 0.67;
 const magicNumber2 = 1.33;
 const magicNumber3 = 0.54;
 //yet magic number
 const k = 1;

// var db = require('./db.js');
// console.log(db.views);
var
    w = '';
let qq = function(x){
    w = x;
}
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection Ok!");
}); 
let getViews = function(res){
    
    let query = "SELECT videos.id,views.user_id,views.time_watch,views.liked,videos.name,videos.duration,videos.owner_id " +
    "FROM views INNER JOIN videos ON views.video_id = videos.id";
    responseText = {
        status: 'ok',
        text:'',
        rows:{}
    }
    
    let result = connection.query(query,function(error, rows){
        if (error) {
            throw error 
            // console.log(error.code);
            responseText.status = 'error';
            responseText.text = error.code;
            // callback(response);
            
        }
        else{
            //console.log(rows);
            responseText.rows = rows;

            // callback(response);
        }
        let fff = {};
        for (let i=0;i<rows.length;i++){
            console.log(rows[i].user_id);
            let duration = (rows[i].duration >= maxDuration) ? maxDuration : rows[i].duration;
            let x = Math.min(maxDuration, duration)/maxDuration * x_end;
            rows[i].x = x;
            let y = Math.atan(Math.pow(x,p3) - Math.PI/2)+1;
            rows[i].y = y;
            rows[i].e = duration;
            let watchDepth = rows[i].time_watch/rows[i].duration;
            rows[i].z = watchDepth;
            let ratio = (Math.atan(Math.pow(Math.min(maxDuration,duration)/maxDuration*magicNumber1+magicNumber2,p5)-Math.PI/2)+shift-2)/magicNumber3*watchDepth*2*relativeDuration;
            rows[i].ratio = ratio;
            let durationWeight = y * ratio / y_end;
            rows[i].durationWeight = durationWeight;
            let watchDepthWeight = (Math.atan(Math.pow(watchDepth*x_end,p3)-Math.PI/2)+shift)*(Math.min(maxDuration,duration)/maxDuration)*(1-ratio)/y_end; 
            rows[i].s = watchDepthWeight;
            let contentRaiting = (durationWeight + watchDepthWeight) * k;
            rows[i].rating = contentRaiting;
            // if (fff[rows[i].user_id == null]){
            //     fff[rows[i].user_id] = [{
            //         id: rows[i].id,
            //         rating: contentRaiting
            //     }]
            // }
            // else{
            //     fff[rows[i].user_id].push(
            //         {
            //             id: rows[i].id,
            //             rating: contentRaiting
            //         }
            //     )
            // }
            
            
        }
        res.send(JSON.stringify(rows));

    });
   
}



app.get('/',function(request, response){
    // getViews(response);
    // console.log(response);
    getViews(response);
    // response.send('<h1>hello</h1>')
})

app.listen(3000);
