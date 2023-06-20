const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
require('dotenv').config();

const Users = require('../app/models/User')

const UserGoogle = Users;


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserGoogle.findById(id)
    .then(user => {
      done(null, user);
    })
});


passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await UserGoogle.findOne({googleId: profile.id});
      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = await new UserGoogle({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.name.familyName + ' ' + profile.name.givenName,
          image: profile.photos[0].value || profile._json.picture,
          token: accessToken
        }).save();
        done(null, user);
      }
    })
);