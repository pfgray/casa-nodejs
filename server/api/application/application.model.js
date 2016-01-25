'use strict';

var _ = require('lodash');
var Q = require('q');
var casa_model = require('../../database');
var model = require('../../database');

module.exports = {
    getApplications:function(callback){
        var db = casa_model.getDatabase();
        db.view('casa/applications', {group: true, reduce: true}, function (err, res) {
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            }));
        });
    },
    getApplicationsForUser:function(db, userId){
      return Q.ninvoke(db.collection('peers').find({
        userId: userId
      }), 'toArray')
      .then(function(peers){
        return _(peers).map(function(peer){
          return peer.apps || [];
        }).flatten().value();
      });
    },
    getApplication:function(originatorId, appId, callback){
        var db = casa_model.getDatabase();
        db.view('casa/applications', {
            key:{originator_id: originatorId, id: appId},
            group:true,
            reduce:true
        }, function (err, res) {
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            })[0]);
        });
    }
}
