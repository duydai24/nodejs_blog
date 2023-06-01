"use strict";

var _require = require('../../util/mongoose'),
  mutipleMongoose = _require.mutipleMongoose,
  mongooseToObject = _require.mongooseToObject,
  mutipleMongooseToObject = _require.mutipleMongooseToObject;
var Course = require('../models/Course');
function storedCourses(req, res, next) {
  Course.find({}).then(function (courses) {
    res.render('me/stored-courses', {
      courses: mutipleMongooseToObject(courses)
    });
  })["catch"](function (err) {
    next(err);
  });
}
module.exports = {
  storedCourses: storedCourses
};