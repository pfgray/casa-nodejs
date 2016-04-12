/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var passport = require('passport');
var environment = require('./config/environment');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/issues', require('./api/issues'));
  app.use('/api/issuesof', require('./api/issues'));
  app.use('/api/apps', require('./api/application'));
  app.use('/api/peers', require('./api/peer'));
  app.use('/api/out/payloads', require('./api/payload'));
  app.use('/api/dashboard', require('./api/dashboard'));
  app.use('/api/storefronts', require('./api/storefronts'));
  app.use('/api', require('./api/user'));

  app.use('/stores/', require('./storefronts'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components)/*')
    .get(errors[404]);

  app.set('view engine', 'ejs');

  //todo: combine these better
  // All other routes should redirect to the index.html
  app.route(['/*'])
    .get(function(req, res) {
      console.log('showing the index file:');
      res.render('index.ejs', {
        user: req.user,
        domain: environment.getDomainUrl(),
        lti: req.session.lti
      });
    });
};
