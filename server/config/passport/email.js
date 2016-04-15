
var passport = require('passport');
var userModel = require('../../api/user/user.model.js');
var LocalStrategy = require('passport-local');
var injectDb = require('../../database/injectDb');

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
      console.log('lolololololol')
      if(user === null){
        console.log('making user...');
        //create the user
        userModel.createUser(req.casa.db, req.body)
        .then(function(umm){
          console.log('umm..');
          res.json({umm:true})
        });
      } else {
        console.log('wuut')
        res.status(400).json({
          error: "A user with this email already exists."
        })
      }
    }, res.json).catch(res.json);
  });

  app.post('/api/login',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/dashboard');
  });
}
