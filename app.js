const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);


const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// untuk regis partials
// hbs.registerPartials(`${__dirname}/views/partials`);

hbsutils.registerPartials(`${__dirname}/views/partials`);
hbsutils.registerWatchedPartials(`${__dirname}/views/partials`);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/materialize', express.static(`${__dirname}/node_modules/materialize-css/dist`));
app.use('/jquery', express.static(`${__dirname}/node_modules/jquery/dist`));
app.use('/material-icons', express.static(`${__dirname}/node_modules/material-design-icons/iconfont`));


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
