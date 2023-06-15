const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
require('dotenv').config();

const Users = require('../app/models/User')

passport.serializeUser((user, done) => {
  console.log('Đã chạy đây 1');

  done(null, user.id);
  // Mới chỉ chạy đến đây
});

passport.deserializeUser((id, done) => {
  // Đây không chạy
  console.log('Đã chạy đây 2');
  User.findById(id)
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
      const existingUser = await Users.findOne({googleId: profile.id});

      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = await new Users({
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