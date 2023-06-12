const newsRouter = require('./news');
const meRouter = require('./me');
const productsRouter = require('./products');
const siteRouter = require('./site');
const apiRouter = require('./api');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/products', productsRouter);
    app.use('/api', apiRouter);
    app.use('/', siteRouter);

}

module.exports = route;
