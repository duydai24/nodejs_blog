"use strict";

//import {engine} from 'express-handlebars';
var sass = require('node-sass');
var express = require('express');
var methodOverride = require('method-override');
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var _require = require('express-handlebars'),
  engine = _require.engine;
var app = express();
var port = 3000;
var db = require('./config/db');

// connect DB
db.connect();
var route = require('./routes');

// HTTP ConseLog
//app.use(morgan('combined'))

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: function sum(a, b) {
      return a + b;
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resoucres', 'views'));
app.use(express["static"](path.join(__dirname, 'public')));

// XMLHttpRequest, fetch, axios, ...
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));

//router init - khởi tạo tuyến đường
route(app);
app.listen(port, function () {
  console.log("App listening on port ".concat(port));
});