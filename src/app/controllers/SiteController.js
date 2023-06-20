const {mutipleMongoose} = require('../../util/mongoose');
const Users = require('../models/User');
const {mutipleMongooseToObject} = require('../../util/mongoose')

async function index(req, res, next) {
    Users.findOne({googleId: req.user?._doc?.googleId})
        .then(user => {
            res.render('home');
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
