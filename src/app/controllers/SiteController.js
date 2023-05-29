const {mutipleMongoose} = require('../../util/mongoose');
const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose')

function index(req, res, next) {
    Course.find({})
        .then(courses => {
            res.render('home', {courses: mutipleMongooseToObject(courses)});
        })
        .catch(err => {
            next(err);
        });
    //res.render('home');
}

// [GET] /search
function show(req, res) {
    res.render('search');
}

module.exports = {index, show};
