'use strict';

var _ = require('lodash');
var request = require('request');
var model = require('./peer.model');
var casa_config = require('../../config/casa.js');

// Get list of things
exports.createUpdateOperation = function(req, res) {

    //get the peer they're talking about
    model.getPeer(req.params.peer, function(err, peer){
        //now, go get all the apps from the payload_url!
        exports.updatePeer(peer, function(err, result){
            if(err){
                console.log('error saving Peer: ', err);
                res.json(result, 500);
            } else {
                res.json(result);
            }
        });
    });
};

var adjInTranslate = function(apps){
    console.log('translating...');
    function translateObject(object){
        for(var key in object){
            if(casa_config.uuid_human[key]){
                //check if we have a human readable string for this uuid key
                object[casa_config.uuid_human[key]] = object[key];
                delete object[key];
            }
        }
    }
    _.each(apps, function(app) {
        _.each(['use', 'require'], function(type){
            console.log('translating... ', JSON.stringify(app));
            translateObject(app.original[type]);
            _.each(app.journal, function(journal_entry){
                translateObject(journal_entry[type]);
            });
        });
    });
    return apps;
}

var adjInSquash = function(apps){
    _.each(apps, function(app) {
        app.attributes = app.original;
        _.each(['use', 'require'], function(type){
            _.each(app.journal, function(journal_entry){
                for(var key in journal_entry[type]){
                    app.attributes[key] = journal_entry[type][key];
                }
            });
        });
    });
    return apps;
}

var adjInFilter = function(apps){
    var filteredApps = [];
    _.each(apps, function(app) {
        var appIsGood = true;
        if(app.attributes.require){
            console.log("app does have required requirements, checking now...");
            for(var key in app.attributes.require){
                console.log("checking that the app has:", key, "...");
                //does a config value exist for this key?
                var translation_understood = false;
                for(var config_key in casa_config.uuid_human){
                    if(key === casa_config.uuid_human[config_key]){
                        translation_understood = true;
                    }
                }
                if(!translation_understood){
                    appIsGood = false;
                }
            }
        } else {
            console.log("app doesn't have any required requirements");
        }

        if(appIsGood){
            filteredApps.push(app);
        }
        //TODO: how to validate per the attribute specification?
        //TODO: how are attributes timestamps kept/stored?
    });
    return filteredApps;
}

exports.updatePeer = function(peer, callback){
    console.log('updating peer...', peer._id);
    request(peer.payload_url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var apps = adjInTranslate(JSON.parse(body));
            apps = adjInSquash(apps);
            apps = adjInFilter(apps);
            //let's add the apps to the peer object!
            peer.apps = apps;
            peer.last_updated = new Date();
            model.updatePeer(peer, function(err, res){
                if(res){
                    peer._rev = res._rev;
                }
                callback(err, peer);
            });
        } else {
            callback(error);
        }
    });
}
