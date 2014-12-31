/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/issues', require('./api/issues'));
  app.use('/api/apps', require('./api/application'));
  app.use('/api/peers', require('./api/peer'));
  app.use('/api/out/payloads', require('./api/payload'));
  app.use('/api', require('./api/user'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      console.log('showing the index file:');
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
