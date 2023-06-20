
const {mutipleMongoose, mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const Users = require('../models/User');
const passport = require('passport');
require('../../util/passport');

// [GET] /auth/google
function login(req, res, next) {
  passport.authenticate('google', {scope: ['profile', 'email']})(req, res, next);
}


// [GET] /auth/google/callback
function loginCallback(req, res) {
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google'
  })(req, res);
};

async function returnUser(req, res, next) {
  try {
    if (req.user === undefined) {
      res.send(false);
    } else {
      res.send(req.user);
    }
  } catch (error) {
    next(error);
  }
}


// [POST] /api/logout
function logout(req, res, next) {
  req.logout();
  res.redirect('/');
}

function loginLocal(req, res, next) {
  req.logout();
  res.redirect('/');
}

function registerLocal(req, res, next) {
  Users.find({})
    .then(user => {
      res.render('users/allUser', {user: mutipleMongooseToObject(user)});
    })
    .catch(err => {
      next(err);
    });
}


module.exports = {login, loginCallback, returnUser, logout, loginLocal, registerLocal};
