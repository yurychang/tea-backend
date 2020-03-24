const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const eventsRouter = require('./routes/events');
// const vendorRouter = require('./routes/vendor');
// const zonesRouter = require('./routes/zones');
// const companysRouter = require('./routes/companys');
const memberRouter = require('./routes/member')


const urlencodeParser = bodyParser.urlencoded({ extended: false });

const cors = require('cors');
var whitelist = ['http://localhost:3000',
  undefined,
  'http://192.168.1.27:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3939',
  'http://127.0.0.1:3939',
  'http://192.168.1.27:3939'
];

const corsOptions = {
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

const app = express();

app.use(urlencodeParser);
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

// app.use('/users', usersRouter);
// app.use('/events', eventsRouter);
// app.use('/vendor', vendorRouter);
// app.use('/zones', zonesRouter);
// app.use('/companys', companysRouter);
app.use('/member', memberRouter);
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
