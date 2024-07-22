const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
require('dotenv').config();

// Serialize user ID to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});

// Generate a referral code based on username
function generateReferralCode(username) {
  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const parts = username.split(' ');
  const firstName = parts[0];
  const lastName = parts.length > 1 ? parts[parts.length - 1] : '';
  const referralCode = `${firstName.slice(0, 3)}${randomNumber}${lastName.slice(0, 3)}`.toLowerCase();
  return referralCode;
}

// Configure Google OAuth strategy
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
          // If user exists, update number if provided in the session or elsewhere
          return done(null, existingUser);
        } else {
          // Generate referral code
          const referralCode = generateReferralCode(profile.displayName);

          // Create a new user
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName,
            number: '', // Default or empty value; update later
            profile_dp: '/src/defaults/default dp.jpg',
            bio: '',
            internshipName: '',
            plan: '',
            location: '',
            collegeName: '',
            instagramId: '',
            linkedinId: '',
            notifications: [],
            referral: referralCode,
            testScore: '',
          });

          newUser.save()
            .then(() => done(null, newUser))
            .catch(err => done(err));
        }
      })
      .catch(err => done(err));
  }
));
