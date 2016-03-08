'use strict';

var _ = require('lodash');
var Q = require('q');
var model = require('../../database');
var collection = 'storefrontLaunches';

module.exports = {
  createStorefrontLaunch:function(db, storefrontId, launchParameters){
    var storefrontLaunch = {
      storefrontId: storefrontId,
      launchParameters: launchParameters,
      date: new Date()
    };
    return Q.ninvoke(db.collection(collection), 'insert', storefrontLaunch)
      .then(function(result){
        return result.ops[0];
      });
  },
  getTotalLaunchesForStorefront: function(db, storefrontId){
    console.log('retrieving stuff:', storefrontId);
    return Q.ninvoke(db.collection(collection).aggregate([
      { $match: { "storefrontId": storefrontId } },
      { $group: { "_id": "$storefrontId", "count": { $sum: 1 } } }
    ]), 'toArray').then(function(res){
      console.log('got:', arguments);
      return res;
    });
  }
}
