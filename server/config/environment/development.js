'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // CouchDB connection options
  couch: {
    host: process.env.COUCH_HOST || 'http://nexus',
    port: process.env.COUCH_PORT || 5984,
    db_name: process.env.COUCH_DB_NAME || 'casa'
  }
};
