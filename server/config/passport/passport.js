var session = require('express-session');
var passport = require('passport');

var userModel = require('../../api/user/user.model.js');

var google = require('./google.js');

module.exports.init = function(app, config){
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    console.log('got url, first: ', config.getDomainUrl());

    google(app, config);

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};
