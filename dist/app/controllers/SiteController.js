"use strict";

var _require = require('../../util/mongoose'),
  mutipleMongoose = _require.mutipleMongoose;
var Course = require('../models/Course');
var _require2 = require('../../util/mongoose'),
  mutipleMongooseToObject = _require2.mutipleMongooseToObject;
function index(req, res, next) {
  Course.find({}).then(function (courses) {
    res.render('home', {
      courses: mutipleMongooseToObject(courses)
    });
  })["catch"](function (err) {
    next(err);
  });
  //res.render('home');
}

// [GET] /search
function show(req, res) {
  res.render('search');
}
module.exports = {
  index: index,
  show: show
};