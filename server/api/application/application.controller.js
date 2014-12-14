'use strict';

var _ = require('lodash');
var model = require('./application.model');

// Get list of things
exports.index = function(req, res) {
  console.log('yeilding to model');
  model.getApplications(function(err, apps){
    if(err){
      console.log('error getting apps: ', err);
      res.json({
        status:'error',
        message:err
      }, 500);
    } else {
      res.json(apps);
    }
  });
};
