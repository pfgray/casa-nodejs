'use strict';

var _ = require('lodash');
var appsModel = require('../application/application.model');
var peersModel = require('../peer/peer.model');
var storefrontModel = require('../storefronts/storefront.model.js');

// Get the dashboard
exports.index = function(req, res) {
    if(!req.user){
      res.json({
        error: "Missing Authentication"
      }, 403);
      return;
    }
    appsModel.getApplicationsForUser(req.casa.db, req.user._id).then(function(apps){
      peersModel.getPeersByUser(req.casa.db, req.user._id).then(function(peers){
        storefrontModel.getStorefrontsByUser(req.casa.db, req.user._id).then(function(storefronts){
          res.json({
            apps:apps,
            peers: peers,
            storefronts: storefronts
          });
        });
      }, function(err){ throw err; });
    })
    .catch(function(err){
      console.log('error getting apps: ', err);
      res.status(500).json({
          status:'error',
          message:err
      });
    });
};
