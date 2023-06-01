"use strict";

var newsRouter = require('./news');
var meRouter = require('./me');
var coursesRouter = require('./courses');
var siteRouter = require('./site');
function route(app) {
  app.use('/news', newsRouter);
  app.use('/me', meRouter);
  app.use('/courses', coursesRouter);
  app.use('/', siteRouter);
}
module.exports = route;