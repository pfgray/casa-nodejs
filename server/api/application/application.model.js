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
        db.view('casa/apps_with_timestamp', {
            startkey:[{originator_id: originatorId, id: appId}],
            endkey:[{originator_id: originatorId, id: appId}, {}]
        }, function (err, res) {
            console.log('got apps: ', JSON.stringify(res));
            //iterate through these to find the one with the most recent timestamp
            if(res.length > 0){
                var mostRecentTimestamp = 0;
                var mostRecentAppIndex = 0; //default to the first app found
                _.each(res, function(res, index){
                    var currentAppTimestamp = new Date(res.key[1]);
                    console.log('got app with timestamp: ', currentAppTimestamp);
                    console.log('    converted to milliseconds: ', currentAppTimestamp.getTime());
                    console.log('    checking against: ', currentAppTimestamp);
                    if(currentAppTimestamp.getTime() > mostRecentTimestamp){
                        mostRecentAppIndex = index;
                        mostRecentTimestamp = currentAppTimestamp.getTime();
                    }
                });
                console.log('returning app with timestamp: ', res[mostRecentAppIndex].key[1])
                callback(null, res[mostRecentAppIndex].value);
            } else {
                callback(null, null);
            }
        });
    }
}
