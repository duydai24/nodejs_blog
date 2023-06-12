const sass = require('node-sass');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const {engine} = require('express-handlebars');
const app = express();
dotenv.config();

const port = process.env.PORT || 3001;

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

// Cấu hình CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Thay đổi địa chỉ tùy theo nguồn gốc của ứng dụng <Next className="js"></Next>
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


//router init - khởi tạo tuyến đường
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
