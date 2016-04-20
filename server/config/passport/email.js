
var passport = require('passport');
var Q = require('q');
var userModel = require('../../api/user/user.model.js');
var LocalStrategy = require('passport-local');
var injectDb = require('../../database/injectDb');
var bcrypt = require('bcrypt');
var invitations = require('../../components/invitations');

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

  app.post('/api/signup', injectDb, function(req, res){
    console.log('got signup request: ', req.body);
    //does there already exist a user with this email?
    userModel.getUserByEmail(req.casa.db, req.body.email)
    .then(function(user){
      if(user === null){
        console.log('making user...');

        //create the user
        return prepUserForDb(req.body)
          .then(user =>
            userModel.createUser(req.casa.db, user));
      } else {
        res.status(400).json({
          error: "A user with this email already exists."
        })
      }
    })
    .then(user => invitations.sendInviteEmailToUser(user))
    .then(user => {
      console.log('okay, made user: ', user);
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
  });

  app.post('/api/login',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/dashboard');
  });
}

const saltRounds = 10;
function prepUserForDb(user) {
  return Q.ninvoke(bcrypt, 'hash', user.password, saltRounds)
    .then(function(hash){
      return {
        email: user.email,
        password: hash,
        pending: false
      };
    });
}
