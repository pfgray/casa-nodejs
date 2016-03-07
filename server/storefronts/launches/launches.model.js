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
    var map = function() {
      emit(this.storefrontId, 1);
    };
    var reduce = function(storefrontId, launches){
      return launches.count;
    };
    return Q.ninvoke(db.collection(collection), 'insert',
       map,
       reduce,
       { out: "map_reduce_example" }
    );
  }
}
