var createError = require('http-errors');
import express, { NextFunction } from 'express';
import compression from "compression";
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use(logger('dev'));

// browser-sync Setup 
if (app.get('env') == 'development') {
  var browserSync = require('browser-sync');
  var connectBrowserSync = require('connect-browser-sync');

  var browserSyncConfigurations = { "files": path.join(__dirname, "../views/*") };
  app.use(connectBrowserSync(browserSync(browserSyncConfigurations)));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../sample')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

app.use(function (req: express.Request, res: express.Response, next: Function) { next(createError(404)) });

app.use(function (err: any, req: express.Request, res: express.Response, next: Function) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
