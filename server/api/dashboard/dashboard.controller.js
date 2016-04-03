'use strict';

var _ = require('lodash');
var appsModel = require('../application/application.model');
var peersModel = require('../peer/peer.model');
var storefrontModel = require('../storefronts/storefront.model.js');
var launchesModel = require('../../storefronts/launches/launches.model.js');

// Get the dashboard
exports.index = function(req, res) {
    if(!req.user){
      res.json({
        error: "Missing Authentication"
      }, 403);
      return;
    }
    var db = req.casa.db;
    var user = req.user._id;
    appsModel.getApplicationsForUser(db, user).then(function(apps){
      peersModel.getPeersByUser(db, user).then(function(peers){
        storefrontModel.getStorefrontsByUser(db, user).then(function(storefronts){
          var ids = storefronts.map(function(s) { return s._id });
          launchesModel.getTotalLaunchesForStorefronts(db, ids).then(function(launchCounts){
            storefronts.map(function(store){
              store.launchCount = _.find(launchCounts, function(launch) {
                return launch._id === store._id.toString();
              }).count;
            });
            res.json({
              apps:apps,
              peers: peers,
              storefronts: storefronts
            });
          }, function(err){ throw err; });
        }, function(err){ throw err; });
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
