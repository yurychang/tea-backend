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
      console.log(origin)
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

app.use(cors(corsOptions));
// app.use('*', cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//測試insert into
app.post('/try-insert', (req, res) => {
  try {
    const data = { success: false, message: { type: 'danger', text: '' } };
    data.body = req.body;
    console.log('req.body', req.body)
    const sql = "INSERT INTO vendordata(vendorAccount,vendorPassword,vendorEmail,vendorPhone) VALUE(?,?,?,?) ";
    db.query(sql, [req.body.vendorAccount, req.body.vendorPassword, req.body.vendorEmail, req.body.vendorPhone], (error, results, fields) => {
      if (error) { throw error }

      if (results.affectedRows === 1) {
        data.success = true;
        data.message.type = 'primary';
        data.message.text = '新增完成'
      } else {
        data.message.text = '資料沒有新增'
      }
      return res.json(data);
    });
  } catch (error) {
    throw error
  }

});
//測試insert into結束

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
