var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const db = require('./src/_connect_db');
const bodyParser = require('body-parser');
const uelencodeParrser = bodyParser.urlencoded({ extended: false });

const cors = require('cors');
var whitelist = ['http://localhost:3000',
  undefined,
  'http://192.168.1.27:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3939',
  'http://127.0.0.1:3939',
  'http://192.168.1.27:3939'
];

var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log('origin:' + origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log("11111")
      callback(new Error('非白名單的網域'))
    }
  }
};
app.use(uelencodeParrser);
app.use(bodyParser.json());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(cors(corsOptions));
app.use('*', cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/try-db', (req, res) => {
  const sql = "SELECT `vendorPassword` from `vendordata`";
  db.query(sql, (error, result, fields) => {
    if (!error) {
      res.json(result);
    } else {
      res.end(error);
    }
    console.log(result);
  });
});
app.use('/users', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
