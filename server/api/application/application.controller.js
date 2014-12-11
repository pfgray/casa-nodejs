
'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  res.json([{
      name : 'Lti Chat',
      info : 'stuff'
  }, {
      name : 'Campus Pack',
      info : 'stuff'
  }]);
};
