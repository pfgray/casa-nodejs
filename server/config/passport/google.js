
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var userModel = require('../../api/user/user.model.js');

module.exports = function(app, config){
  passport.use(new GoogleStrategy({
      clientID: process.env.CASA_GOOGLE_CLIENT_ID,
      clientSecret: process.env.CASA_GOOGLE_CLIENT_SECRET,
      callbackURL: config.getDomainUrl() + "/auth/google/callback"
    }, function(accessToken, refreshToken, profile, done) {
      console.log('got: ', accessToken, refreshToken, profile);
      var googleUser = profile._json;
      googleUser.googleId = profile.id;
      googleUser.displayName = profile.displayName;
      googleUser.googleAccessToken = accessToken;
      googleUser.googleRefreshToken = refreshToken;
      userModel.findOrCreate({
          googleId: profile.id
      }, googleUser, function(err, user) {
          return done(err, user);
      });
    })
  );

  // Redirect the user to Google for authentication.  When complete, Google
  // will redirect the user back to the application at
  //     /auth/google/return
  app.get('/auth/google', passport.authenticate('google', {scope: 'email'}));

  // Google will redirect the user to this URL after authentication.  Finish
  // the process by verifying the assertion.  If valid, the user will be
  // logged in.  Otherwise, authentication has failed.
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/dashboard');
  });

}
