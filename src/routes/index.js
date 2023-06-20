const newsRouter = require('./news');
const meRouter = require('./me');
const productsRouter = require('./products');
const siteRouter = require('./site');
const apiRouter = require('./api');
const authRouter = require('./auth');
const userRouter = require('./users');

const {requireEditer, requireAdmin} = require('../util/requireLogin');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/news', requireEditer, newsRouter);
    app.use('/me', requireEditer, meRouter);
    app.use('/products', requireEditer, productsRouter);
    app.use('/api', apiRouter);
    app.use('/auth', authRouter);
    app.use('/users', requireAdmin, userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
