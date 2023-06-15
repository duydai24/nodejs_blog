const {oauth2} = require('googleapis/build/src/apis/oauth2');
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
    successRedirect: '/api/current_user',
    failureRedirect: '/'
  })
};

// [GET] /api/current_user
async function returnUser(req, res, next) {
  console.log(req.session);
  console.log(req.user);
  try {
    if (req.user === undefined) {
      res.send(false);
    } else {
      const {_id} = req.user;
      let user = req.user;
      let projects = await Highlights.find({_uid: user._id});
      let foreignProjects = user.access.filter(a => a.type === "project" && a.status === "confirmed");
      foreignProjects = await Promise.all(foreignProjects.map(async p => {
        const project = await Highlights.findById(p.target);
        return project;
      }));
      foreignProjects = foreignProjects.filter(p => p._uid.toString() !== _id.toString());
      projects = projects.concat(foreignProjects);
      user = {...req.user._doc, projects};
      const friends = await Promise.all(user.friends.map(async f => {
        const reqUser = await User.findById(f._id);
        return {...f._doc, firstName: reqUser.firstName, lastName: reqUser.lastName};
      }));
      const access = await Promise.all(user.access.map(async a => {
        const reqUser = await User.findById(a.user);
        let reqTarget;
        if (a.type === "project") {
          reqTarget = await Highlights.findById(a.target);
          reqTarget = reqTarget.title;
        } else {
          reqTarget = reqUser.folders.find(f => f._id === a.target);
          reqTarget = reqTarget.name;
        }
        return {...a._doc, firstName: reqUser.firstName, lastName: reqUser.lastName, name: reqTarget};
      }));
      user = {...user, friends, access};
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
}


// [POST] /api/logout
function logout(req, res, next) {
  creq.logout();
  res.redirect('/');
}

function allUser(req, res, next) {
  Users.find({})
    .then(user => {
      res.render('users/allUser', {user: mutipleMongooseToObject(user)});
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {login, loginCallback, returnUser, logout, allUser};
