const {mutipleMongoose, mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const Course = require('../models/Course');


function storedCourses(req, res, next) {

  Promise.all([Course.find({}), Course.countDocumentsDeleted()])
    .then(([courses, deleteCount]) => {
      res.render('me/stored-courses', {
        courses: mutipleMongooseToObject(courses),
        deleteCount
      });
    })
    .catch(err => {
      next(err)
    })

  //Course.countDocumentsDeleted()
  //  .then(deleteCount => {
  //    console.log(deleteCount)
  //  })
  //  .catch(err => {
  //    next(err);
  //  });

  //Course.find({})
  //  .then(courses => {
  //    res.render('me/stored-courses', {courses: mutipleMongooseToObject(courses)});
  //  })
  //  .catch(err => {
  //    next(err);
  //  });

}

function trashCourses(req, res, next) {
  Course.findDeleted({})
    .then(courses => {
      res.render('me/trash-courses', {courses: mutipleMongooseToObject(courses)});
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {storedCourses, trashCourses};
