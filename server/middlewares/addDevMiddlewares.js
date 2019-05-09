const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

/* Google auth. */
const passport = require('passport');
const session = require('express-session');
require('./config/passport');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    logLevel: 'warn',
    publicPath,
    silent: true,
    stats: 'errors-only',
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath,
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  /* Auth. */
  app.use(session({ secret: 'kitty-kat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  function isAuthenticated(req, res, next) {
    if (req.user) {
      console.log('logged in', req.user);
    } else {
      console.log('not logged in');
    }
    if (req.user) return next();
    return res.redirect('/login');
  }

  /* GOOGLE oAuth */
  app.get(
    '/login',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      session: true,
    }),
    (req, res) => {
      res.redirect('http://localhost:3000/dashboard');
    },
  );
  /** **** */
  app.get('*', isAuthenticated, (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
