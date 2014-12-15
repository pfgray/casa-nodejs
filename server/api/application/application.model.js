'use strict';

var _ = require('lodash');
var casa_model = require('../../database');

module.exports = {
    getApplications:function(callback){
        var db = casa_model.getDatabase();
        db.view('casa/applications', null, function (err, res) {
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            }));
        });
    },
    getApplication:function(originatorId, appId, callback){
        var db = casa_model.getDatabase();
        db.view('casa/applications', {key:{originator_id: originatorId, id: appId}}, function (err, res) {
            //TODO: is there a better way to find a single entity?
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            })[0]);
        });
    }
}
