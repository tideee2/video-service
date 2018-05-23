var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var mysql      = require('mysql');
var app = express();
var fs = require("fs");



var jsonParser = bodyParser.json();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
var connection = mysql.createConnection({
   host: '192.168.99.100',
	port: '3306',
    user: 'root',
    password: 'root',
    database: 'video-service',
    multipleStatements: true
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
 const servicePrice = 0.3;
 const userMoney = 10;

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
            // console.log(rows[i].user_id);
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
        }
        let videoCost = {};
        let users = [];
        for(let i=0; i < rows.length; i++){
         if   (videoCost.hasOwnProperty(rows[i].user_id)) {
            videoCost[rows[i].user_id].totalRating +=rows[i].rating; 
         } 
         else{
            videoCost[rows[i].user_id] = {}
            videoCost[rows[i].user_id].totalRating = rows[i].rating;
            users.push(rows[i].user_id);
         }
            
        }
        let videoMoney = {};
        let queryTransactionToVideo = 'INSERT INTO transactionstovideo (`id-from`,`id-to`,`money`,`timestamp`) VALUES ';
        for(let i=0; i < rows.length; i++){
            rows[i].videoPercent = rows[i].rating / videoCost[rows[i].user_id].totalRating;
            rows[i].MoneyFromUser = rows[i].videoPercent * userMoney * (1-servicePrice);
            if (videoMoney.hasOwnProperty(rows[i].id)){
                videoMoney[rows[i].id] += rows[i].MoneyFromUser;
            }
            else{
                videoMoney[rows[i].id] = rows[i].MoneyFromUser;
            }
            let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
            queryTransactionToVideo += '('+rows[i].user_id +','+rows[i].id+','+rows[i].MoneyFromUser.toFixed(2)+',"'+timestamp+'"),'
            console.log(videoMoney);
        }
        queryTransactionToVideo = queryTransactionToVideo.slice(0,-1)+';';
        console.log('--'+queryTransactionToVideo+'--');

        connection.query(queryTransactionToVideo,function(error, rows){
            if (error) throw error.code;
            console.log(rows);
        });
        console.log(videoCost);
        createVideoPrice(videoMoney);
        console.log(users);
        changeSubscriberBudget(users);
        res.send(JSON.stringify(videoMoney));
        changeInvestorBudget(videoMoney);
    });
   
}

function createVideoPrice(videoMoney){
    let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = 'TRUNCATE TABLE videoprice; '
    query += "INSERT INTO videoprice  (video_id,price,time) VALUES";
    for (var prop in videoMoney) {
        query +=  " ("+prop+","+videoMoney[prop].toFixed(2)+",'"+timestamp+"'),";
    };
    query = query.slice(0,-1);
    query += ';';
    console.log(query);
    connection.query(query,function(error, rows){
       if (error) throw error;
       console.log(rows); 
    });
}

function changeSubscriberBudget(users){
    let query1 ='';
    query1 = "UPDATE `users` SET `budget`=(`budget`-10) WHERE id in ("
    for (let i=0; i<users.length;i++){
        query1+=users[i]+',';
    }
    
    query1 = query1.slice(0,-1) + '); ';
    query1 += "UPDATE users SET budget=budget+" + users.length * servicePrice * userMoney + " WHERE name='service';";
    console.log(query1);
    //query1 += "INSERT INTO transactions "
    connection.query(query1,function(error1, rows1){
       if (error1) throw error1;
       console.log(rows1);
    });
}

function changeInvestorBudget(video_id){
    let query = 'SELECT user_id, percent, video_id FROM invest WHERE video_id in (';
    for (var prop in video_id) {
        query += prop + ',';
    }
    query = query.slice(0,-1) + ')';
    console.log(query);
    connection.query(query,function(error, rows){
        if (error) throw error;
        let query2 ='';
        let query3 ='INSERT INTO transactionstouser (`id-from`,`id-to`,`money`,`timestamp`) VALUES ';
        for (let i=0; i<rows.length;i++){
            rows[i].moneToInvest = video_id[rows[i].video_id] * rows[i].percent/100;
            query2 += 'UPDATE `users` SET budget=budget+' +rows[i].moneToInvest.toFixed(2) + ' WHERE id='+
            rows[i].user_id + '; ';
            let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
            query3 += '(' +rows[i].video_id+','+rows[i].user_id+','+rows[i].moneToInvest.toFixed(2)+',"'+timestamp+'"),'
        }
        connection.query(query2,function(error2, rows2){
            if (error2) throw error2.code;
            console.log(query2);
        });
        query3 = query3.slice(0,-1) + ';';
        console.log('---'+query3);

        connection.query(query3,function(error3, rows3){
            if (error3) throw error3.code;
        });
        // console.log(rows);
        console.log(query2);
     });
}

app.post('/moneyToVideo/',function(request, response){
    getViews(response);
})

app.post('/setViews', function(request, response){
    let query = 'TRUNCATE TABLE `views`; ';
    query += 'INSERT INTO `views` (`id`, `video_id`, `user_id`, `time_watch`, `liked`) VALUES'+
    '(1, 1, 1, 3600, 0),(2, 1, 6, 1000, 0),(3, 1, 7, 1800, 0),(4, 2, 1, 400, 0),(5, 4, 1, 300, 0);'
    connection.query(query,function(error, rows){
        if (error) throw error.code;
        console.log(query);
    });
})

app.post('/changeAllBudget',function(request, response){
    let query = 'UPDATE users SET budget=100';
    connection.query(query,function(error, rows){
        if (error) throw error.code;
        console.log(query);
    });

})

app.post('/reset', function(request, response){
    fs.readFile("video-service2.sql", "utf8",function (err, data) {
        if (err) throw err;
        console.log(data.toString());
        let query = data.toString();
        connection.query(query,function(error, rows){
            if (error) throw error.code;
            //console.log(query);
        });
    });
})

app.get('/',function(request, response){
    response.sendFile(__dirname + '/mill.html');
})


app.listen(3002);
