var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var userModel = require('../api/user/user.model.js');

module.exports.init = function(app, config){
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    console.log('got url, first: ', config.getDomainUrl());
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
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};
