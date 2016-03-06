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
  }
}
