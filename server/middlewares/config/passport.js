const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const isProd = process.env.NODE_ENV === 'production';

let CALLBACK_URL = 'http://localhost:3000/auth/google/callback';
if (isProd) {
  CALLBACK_URL = 'https://fika.eu-gb.mybluemix.net/auth/google/callback';
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '79874803324-ib9h851mukndboukc7tci0me53c7av70.apps.googleusercontent.com',
      clientSecret: '_OOD6i7RYu8whD3URyzPnMV3',
      callbackURL: CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken,
      };
      done(null, userData);
    },
  ),
);
