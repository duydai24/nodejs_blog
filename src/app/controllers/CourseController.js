const {mutipleMongoose, mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const Course = require('../models/Course');

function index(req, res, next) {
  Course.find({})
    .then(courses => {
      res.render('courses/index', {courses: mutipleMongooseToObject(courses)});
    })
    .catch(err => {
      next(err);
    });
}

// [GET] /course
function show(req, res, next) {

  Course.findOne({slug: req.params.slug})
    .then(courses => {
      res.render('courses/show', {courses: mongooseToObject(courses)});
    })
    .catch(err => {
      next(err);
    });
}

// [GET] /course/create
function create(req, res, next) {

  res.render('courses/create')
}
// [POST] /course/store
function store(req, res, next) {
  const formData = req.body;
  // formData.image = 'text'
  const course = new Course(formData);
  course.save()
    .then(() => {
      res.redirect(`/courses`);
    })
    .catch(err => {
      next(err);
    });
}

function edit(req, res, next) {
  Course.findById(req.params.id)
    .then(courses => {
      res.render('courses/edit', {courses: mongooseToObject(courses)});
    })
    .catch(err => {
      next(err);
    });
  //res.render('courses/edit')
}

function update(req, res, next) {
  Course.updateOne({_id: req.params.id}, req.body)
    .then(() => {
      res.redirect('/me/stored/courses');
    })
    .catch(err => {
      next(err);
    });
}

function deleteCourse(req, res, next) {
  Course.delete({_id: req.params.id})
    .then(() => {
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
}

function deleteCourseForever(req, res, next) {
  Course.deleteOne({_id: req.params.id})
    .then(() => {
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
}

function restore(req, res, next) {
  Course.restore({_id: req.params.id})
    .then(() => {
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
}


function handleFormAction(req, res, next) {
  switch (req.body.action) {
    case 'delete':
      Course.delete({_id: {$in: req.body.courseIds}})
        .then(() => {
          res.redirect('back');
        })
        .catch(err => {
          next(err);
        });
      break;
    default:
      res.json({message: 'Action error!'})
  }
}

module.exports = {index, show, create, store, edit, update, deleteCourse, deleteCourseForever, restore, handleFormAction};
