/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var passport_config = require('./passport.js');
var session = require('express-session');
var cors = cors = require('cors');
var httpProxy = require('http-proxy');

module.exports = function(app) {
  var env = app.get('env');

  app.use(cors());

  var cfg = {
    protocol: process.env.HOST_PROTOCOL || 'http',
    domain: process.env.HOST_DOMAIN || 'localhost',
    port: process.env.HOST_PORT || 9000
  };

  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  if ('production' === env) {
    //app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.use(morgan('prod'));
  }

  if ('development' === env || 'test' === env) {
    var bundle = require('./bundler.js');
    bundle();
    var proxy = httpProxy.createProxyServer();
    app.all('/assets/*', function (req, res) {
      proxy.web(req, res, {
          target: 'http://localhost:9001'
      });
    });

    app.use(morgan('dev'));
    app.disable('etag');
    app.use(errorHandler()); // Error handler - has to be last
  }

  //Setup passport:
  console.log('got: ', JSON.stringify(cfg));
  passport_config.init(app, cfg);

};
