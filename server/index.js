/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');

/* Google auth requires. */
const passport = require('passport');
const session = require('express-session');
require('./middlewares/config/passport');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const api = require('./api/api');
const app = express();
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', api);
/* **** GOOGLE OAuth **** */
app.use(session({ secret: 'kitty-kat' }));
app.use(passport.initialize());
app.use(passport.session());
/* Login to Google. */
app.get(
  '/auth',
  (req, res, next) => {
    if (req.user) {
      return res.redirect('/dashboard');
    }
    return next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
/* Login callback. */
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    session: true,
  }),
);
// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }
  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
