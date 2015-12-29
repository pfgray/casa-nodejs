'use strict';

var _ = require('lodash');
var model = require('./application.model');

// Get list of things
exports.index = function(req, res) {
    if(!req.user){
      res.json({
        error: "Missing Authentication"
      }, 403);
      return;
    }
    model.getApplicationsForUser(req.casa.db, req.user._id).then(function(apps){
      res.json(apps);
    }, function(err){
      console.log('error getting apps: ', err);
      res.status(500).json({
          status:'error',
          message:err
      });
    });
};

exports.getApp = function(req, res) {
    console.log('getting app: ', req.params);
    model.getApplication(req.params.originatorId, req.params.appId, function(err, app){
        if(err){
            console.log('error getting app: ', err);
            res.json({
                status:'error',
                message:err
            }, 500);
        } else {
            res.json(app);
        }
    });
};
