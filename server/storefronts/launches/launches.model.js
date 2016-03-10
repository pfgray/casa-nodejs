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
  getTotalLaunchesForStorefronts: function(db, storefrontIds){
    console.log('retrieving stuff:', storefrontIds);
    return Q.ninvoke(db.collection(collection), 'aggregate', [
      { "$match": { "storefrontId": { "$in": storefrontIds } } },
      { "$group": { "_id": "$storefrontId", "count": { "$sum": 1 }}}
    ]).then(function(res){
      console.log('got:', arguments);
      return res;
    });

    // return Q.ninvoke(db.collection(collection), 'count', {
    //   "storefrontId": storefrontId
    // }).then(function(res){
    //   console.log('got:', arguments);
    //   return res;
    // });

    // return Q.ninvoke(db.collection(collection).aggregate([
    //   { $match: { "storefrontId": storefrontId } },
    //   { $group: { "_id": "$storefrontId", "count": { $sum: 1 } } }
    // ]), 'toArray')
  }
}
