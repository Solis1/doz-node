var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var App = {};
//
// App.sendmessage = function(send) {
//   data = {
//     message : send,
//     action : "speak"
//   };
//   message = {
//     command: "message",
//     identifier: JSON.stringify(App.param),
//     data: JSON.stringify(data)
//   };
//   App.ws.send(JSON.stringify(message));
// }
//
// App.connect_server = function() {
//   const WebSocket = require('ws');
//   App.ws = new WebSocket('ws://148.229.5.174:3000/cable');
//
//   App.param = {channel: "DiscountChannel"};
//
//   App.ws.on('open', function open() {
//     data = {
//       command: "subscribe",
//       identifier: JSON.stringify(App.param)
//     }
//   });
//
//   App.ws.on('message', function incoming(data) {
//     console.log(data);
//   });
//
// }
// App.connect_server();

const WebSocket = require('ws');

const wss = new WebSocket('ws://148.229.5.174:3000/cable');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
