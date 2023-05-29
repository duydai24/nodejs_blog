const {mutipleMongoose, mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const Course = require('../models/Course');

function storedCourses(req, res, next) {
  Course.find({})
    .then(courses => {
      res.render('me/stored-courses', {courses: mutipleMongooseToObject(courses)});
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {storedCourses};
