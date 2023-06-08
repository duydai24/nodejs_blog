//import {engine} from 'express-handlebars';
const sass = require('node-sass');
const express = require('express');
const methodOverride = require('method-override');
//var mongoose_delete = require('mongoose-delete');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const {engine} = require('express-handlebars');
const app = express();
const port = 3001;

mongoose.set('strictQuery', false);

const db = require('./config/db')

// connect DB
db.connect();

const route = require('./routes');

// HTTP ConseLog
//app.use(morgan('combined'))

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b
    }
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resoucres', 'views'));


app.use(express.static(path.join(__dirname, 'public')));

// XMLHttpRequest, fetch, axios, ...
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'))

//router init - khởi tạo tuyến đường
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
