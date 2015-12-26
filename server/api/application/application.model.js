'use strict';

var _ = require('lodash');
var casa_model = require('../../database');

module.exports = {
    getApplications:function(callback){
        var db = casa_model.getDatabase();
        db.view('casa/applications', {group: true, reduce: true}, function (err, res) {
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            }));
        });
    },
    getApplicationsForUser:function(userId, callback){
        var db = casa_model.getDatabase();
        var opts = {
          startkey: [userId],
          endkey: [userId, {
            originator_id: {},
            id: {}
          }],
          group: true,
          reduce: true
        };
        console.log('Using opts: ', opts);
        db.view('casa/applicationsByUser', opts, function (err, res) {
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            }));
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
