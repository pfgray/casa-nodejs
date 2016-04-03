'use strict';

var _ = require('lodash');
var Q = require('q');
var model = require('../../database');
var collection = 'storefrontLaunches';
var ObjectId = require('mongodb').ObjectId;

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
  getTotalLaunchesForStorefronts: function(db, storefrontIds){
    var ids = storefrontIds.map(function(id){
      return id.toString();
    });
    return Q.ninvoke(db.collection(collection), 'aggregate', [
      { "$match": { "storefrontId": { "$in": ids } } },
      { "$group": { "_id": "$storefrontId", "count": { "$sum": 1 }}}
    ]).then(function(res){
      console.log('got:', arguments);
      return res;
    });
  }
}
