// api/index.js

const express = require('express');
const app = express();

const {engine} = require('../src/express-handlebars');
const db = require('../src/config/db');
const route = require('../src/routes');

const port = 3000;

// Gọi lại các module từ src/index.js
const {engine} = require('../src/express-handlebars');
const db = require('../src/config/db');
const route = require('../src/routes');

// Kết nối DB
db.connect();

// Cấu hình engine handlebars
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
app.set('views', path.join(__dirname, 'resources', 'views'));

// Cấu hình static folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware parse JSON và xử lý method override
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

// Khởi tạo tuyến đường
route(app);

// Khởi chạy server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
