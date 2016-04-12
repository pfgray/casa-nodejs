
var passport = require('passport');
var userModel = require('../../api/user/user.model.js');
var LocalStrategy = require('passport-local');

module.exports = function(app, config){
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true
  },
  function(email, password, done) {
      console.log('Creating local user... ', email, password);
      done(null, {
        email: email,
        password: password
      });
    }
  ));

  app.post('/api/signup', function(req, res){
    console.log('got signup request: ', req.body);
    res.json(req.body);
  });

  app.post('/api/login',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/dashboard');
  });
}
