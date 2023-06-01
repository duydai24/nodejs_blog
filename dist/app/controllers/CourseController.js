"use strict";

var _require = require('../../util/mongoose'),
  mutipleMongoose = _require.mutipleMongoose,
  mongooseToObject = _require.mongooseToObject,
  mutipleMongooseToObject = _require.mutipleMongooseToObject;
var Course = require('../models/Course');
function index(req, res, next) {
  Course.find({}).then(function (courses) {
    res.render('courses/index', {
      courses: mutipleMongooseToObject(courses)
    });
  })["catch"](function (err) {
    next(err);
  });
}

// [GET] /course
function show(req, res, next) {
  Course.findOne({
    slug: req.params.slug
  }).then(function (courses) {
    res.render('courses/show', {
      courses: mongooseToObject(courses)
    });
  })["catch"](function (err) {
    next(err);
  });
}

// [GET] /course/create
function create(req, res, next) {
  res.render('courses/create');
}
// [POST] /course/store
function store(req, res, next) {
  var formData = req.body;
  // formData.image = 'text'
  var course = new Course(formData);
  course.save().then(function () {
    res.redirect("/courses");
  })["catch"](function (err) {
    next(err);
  });
}
function edit(req, res, next) {
  Course.findById(req.params.id).then(function (courses) {
    res.render('courses/edit', {
      courses: mongooseToObject(courses)
    });
  })["catch"](function (err) {
    next(err);
  });
  //res.render('courses/edit')
}

function update(req, res, next) {
  Course.updateOne({
    _id: req.params.id
  }, req.body).then(function () {
    res.redirect('/me/stored/courses');
  })["catch"](function (err) {
    next(err);
  });
}
module.exports = {
  index: index,
  show: show,
  create: create,
  store: store,
  edit: edit,
  update: update
};