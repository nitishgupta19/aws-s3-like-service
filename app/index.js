/* eslint-disable no-console */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const Routes = require('./routes');

class ExpressApp {
  constructor(app) {
    this.app = app;
    this.setMiddleware();
  }

  getApp() {
    return this.app;
  }

  setMiddleware() {
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use('/public', express.static('public'));
    this.app.use(cors());
    this.app.use('/', Routes);
    this.app.use('/cloudStorage', express.static('cloudStorage'));
    this.app.use((req, res, next) => {
      next(createError(404));
    });
    // error handler
    // eslint-disable-next-line no-unused-vars
    this.app.use((err, req, res, next) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      console.error(err.message);
      res.status(err.status || 500);
      res.render('error');
    });
  }
}

const myApp = new ExpressApp(express());
export default myApp.getApp();
