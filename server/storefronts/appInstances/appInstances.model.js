'use strict';

var _ = require('lodash');
var Q = require('q');
var model = require('../../database');
var group = 'appInstances';

module.exports = {
  getAppInstances:function(db, storefrontId){
    return Q.ninvoke(db.collection('appInstances').find({
      storefrontId: storefrontId
    }), 'toArray')
    .then(function(peers){
      return _(peers).map(function(peer){
        return peer.apps || [];
      }).flatten().value();
    });
  }
}
