'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'casa-nodejs-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  getDomainUrl: function(){
    var port = this.host.port && this.host.port.length > 0 ? ':' + this.host.port: '';
    return this.host.protocol + '://' + this.host.domain + port;
  }

};

console.log(all);

var envConfig = require('./' + process.env.NODE_ENV + '.js') || {};

//better way to do this?
envConfig.host = {
  protocol: process.env.HOST_PROTOCOL || envConfig.host.protocol,
  domain: process.env.HOST_DOMAIN || envConfig.host.domain,
  port: process.env.HOST_PORT || envConfig.host.port
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all, envConfig);
