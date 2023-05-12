const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    //app.get('/', (req, res) => {
    //  res.render('home');
    //})

    //app.get('/news', (req, res) => {
    //  res.render('news');
    //})
    app.use('/news', newsRouter);
    //app.use('/search', newsRouter);
    app.use('/', siteRouter);

    // action --> dispatcher --> function handler

    //app.get('/search', (req, res) => {
    //  console.log(req.query);
    //  res.render('search');
    //})

    //app.post('/search', (req, res) => {
    //  //console.log(req.body);
    //  res.render('search');
    //})
}

module.exports = route;
