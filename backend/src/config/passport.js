const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      proxy: true 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists by email (link accounts)
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link Google ID to existing email account
          user.googleId = profile.id;
          if (!user.avatar) user.avatar = profile.photos[0].value;
          await user.save();
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          role: 'customer'
        });

        done(null, user);
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }
  )
);

// We are not using sessions (JWT based), but Passport might require these for serialization if session is true (it is by default in some setups, but we will disable it in routes)
// Keeping them just in case specific flows trigger session usage.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
