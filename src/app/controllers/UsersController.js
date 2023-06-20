const {mutipleMongoose, mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const Users = require('../models/User');
const passport = require('passport');
require('../../util/passport');



function allUser(req, res, next) {
  Users.find({})
    .then(users => {
      res.render('users/allUser', {users: mutipleMongooseToObject(users)});
    })
    .catch(err => {
      next(err);
    });
}

function edit(req, res, next) {
  Users.findById(req.params.id)
    .then(user => {
      res.render('users/edit', {user: mongooseToObject(user)});
    })
    .catch(err => {
      next(err);
    });
}

function update(req, res, next) {
  Users.updateOne({_id: req.params.id}, req.body)
    .then(() => {
      res.redirect('/users/allUser');
    })
    .catch(err => {
      next(err);
    });
}
// [GET] /api/current_user


module.exports = {allUser, edit, update};