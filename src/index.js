const sass = require('node-sass');
const express = require('express');
const methodOverride = require('method-override');
//const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const {engine} = require('express-handlebars');
const passport = require('passport');
require('./util/passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sessionExpress = require('express-session');
const keys = require('./util/key');
const flash = require('connect-flash');
const app = express();
dotenv.config();

const port = process.env.PORT || 3001;

mongoose.set('strictQuery', false);

const db = require('./config/db')

// connect DB
db.connect();

const route = require('./routes');

// HTTP ConseLog
//sử dụng để ghi lại thông tin về các yêu cầu (requests) và phản hồi (responses)
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

// Tăng giới hạn kích thước tải trọng lên 10MB
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));


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
  res.setHeader('Access-Control-Allow-Origin', 'https://www.saleoff.tech'); // Thay đổi địa chỉ tùy theo nguồn gốc của ứng dụng
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(sessionExpress({
  secret: keys.cookieKey, // Chuỗi bí mật để ký và mã hóa phiên
  resave: false, // Không lưu lại phiên trong trường hợp không có thay đổi
  saveUninitialized: false, // Không lưu lại phiên chưa được khởi tạo
  cookie: {
    secure: false, // true nếu sử dụng HTTPS
    maxAge: 30 * 24 * 60 * 60 * 100, // Thời gian sống của cookie phiên (trong millisecond)
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use((err, req, res, next) => {
  console.error(err); // In ra lỗi trong console
  // Gửi phản hồi lỗi cho client hoặc thực hiện xử lý lỗi khác tùy theo yêu cầu
  res.status(500).json({error: 'Internal Server Error'});
});

app.use((req, res, next) => {
  if (req?.user) {
    req.session.user = req.user._doc;
    res.locals.user = req.session.user;
  }
  next();
});


//router init - khởi to tuyến đường
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
