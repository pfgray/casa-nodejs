'use strict';

var _ = require('lodash');
var casa_model = require('../../database');

module.exports = {
    getApplications:function(callback){
        var db = casa_model.getDatabase();
        db.view('casa/applications', {group: true}, function (err, res) {
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.key[1]);
            }));
        });
    },
    getApplication:function(originatorId, appId, callback){
        var db = casa_model.getDatabase();
        db.view('casa/apps_by_id', {key:{originator_id: originatorId, id: appId}}, function (err, res) {
            //TODO: is there a better way to find a single entity?
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            })[0]);
        });
    }
}
