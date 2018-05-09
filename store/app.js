var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var server = http.Server(app);
var socketio = require('socket.io');
var io = socketio(server);
const connection = require('./DB/connection.js');//connect to database
const hendlerConnection = require('./DB/hendlerConnection.js');//handler disconnect of database

var indexRouter = require('./routes/index');

var buffer = {};// storage of all users online in type {user: }


app.get('/', function(req, res, next) {
    res.sendFile(path.join( __dirname + '/public/index.html'))
    //res.render('index', { title: 'Express' });
});
/*In this method catching json request type {user: X, video: X, onTime 1(0)}.
If user with this socket absent in buffer add in buffer and assigns time=10
 else watching onTime = 0 or user changing video, in both cases send changes in database
 If onTime = 1 add 10 to user time   */
io.on('connection',  function(socket){
    console.log('connected');
    socket.on('video', function (msg) {
        var msg = JSON.parse(msg);
        var ms = msg.onTime;
        console.log(' ' + ms);
        if (socket.id in buffer) {

            if (msg.onTime == 0 || buffer[socket.id].video != msg.video ) {
              if(buffer[socket.id].time !=0) {
                  var sql = "INSERT INTO video (user, video, time) VALUES('" + buffer[socket.id].user + "', '" + buffer[socket.id].video + "', '" + buffer[socket.id].time + "' )";
                  console.log(sql);
                  connection.query(sql, function (err, result) {
                      if (err) throw err;
                      console.log(result);
                  });
                  buffer[socket.id].time = 0;
              }
            }
            if (msg.onTime) {
                if(buffer[socket.id].video != msg.video){//if user change video
                    buffer[socket.id].video = msg.video
                    buffer[socket.id].time = 0;
                }
                buffer[socket.id].time += 10;
                console.log(buffer[socket.id].time);
            }
        } else {//creating new user in buffer
            buffer[socket.id] = {};
            buffer[socket.id].user = msg.user;
            buffer[socket.id].video = msg.video;
            buffer[socket.id].time = 10;
        }
    });
    socket.on('disconnect', function() {

        if(socket.id in buffer && buffer[socket.id].time != 0) {//if user disconnect add data on database
            var sql = "INSERT INTO video (user, video, time) VALUES('" + buffer[socket.id].user + "', '" + buffer[socket.id].video + "', '" + buffer[socket.id].time + "' )";
            connection.query(sql, function (err, result) {
                if (err) throw err;
            });
            delete buffer[socket.id];//deleting user
        }

    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
server.listen(3000, function () {
    console.log('I listing ...')
});

module.exports = app;
