'use strict';

var _ = require('lodash');
var Q = require('q');
var model = require('../../database');

var storefrontModel = require('../storefronts/storefront.model');

var appModel = {
    getApplicationsForUser: function(db, userId){
      console.log('getting apps for user...');
      return Q.ninvoke(db.collection('peers').find({
        userId: userId
      }), 'toArray')
      .then(function(peers){
        return _(peers).map(function(peer){
          return peer.apps || [];
        }).flatten().value();
      });
    },
    getApplicationsForStorefront: function(db, storefrontId){
      return storefrontModel.getStorefront(db, storefrontId)
      .then(function(storefront){
        console.log('getting apps... for storefront');
        return appModel.getApplicationsForUser(db, storefront.userId)
      }.bind(this));
    }
}

module.exports = appModel;
