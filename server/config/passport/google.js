
var userModel = require('../../api/user/user.model.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport, config){
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

}
