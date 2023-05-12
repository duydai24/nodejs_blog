//import {engine} from 'express-handlebars';
const sass = require('node-sass');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {engine} = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
// HTTP ConseLog
//app.use(morgan('combined'))

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resoucres/views'));

app.use(express.static(path.join(__dirname, 'public')));

// XMLHttpRequest, fetch, axios, ...
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

//router init - khởi tạo tuyến đường
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
