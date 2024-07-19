const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id })
      .then(existingUser => {
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value, 
            username: profile.displayName, 
            profile_dp: '/src/defaults/default dp.jpg',
            bio: '',
            internshipName: null,
            internshipId: null,
            plan: null,
            location: null,
            collegeName: null,
            instagramId: null,
            linkedinId: null,
            notifications: [],
            referral: referralCode, // Assuming referral is a string
            testScore: null,
          });
          newUser.save()
            .then(() => done(null, newUser))
            .catch(err => done(err));
        }
      })
      .catch(err => done(err));
  }
));
