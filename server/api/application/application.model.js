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
        db.view('casa/applicationsByUser', {key: userId}, function (err, res) {
            console.log("got apps for user: ", userId, res);
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
