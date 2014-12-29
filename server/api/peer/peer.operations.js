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
    _.forEach(apps, function(app) {
        //move the attributes we know about directly into the 'original' attribute, with their human-readable name
        _.each(['use', 'require'], function(type){
            translateObject(app.original[type]);
            if(app.journal){
                _.each(app.journal, function(journal_entry){
                    translateObject(journal_entry[type]);
                });
            }
        });
    });
    return apps;
}

exports.updatePeer = function(peer, callback){
    request(peer.payload_url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var apps = adjInTranslate(JSON.parse(body));
            //let's add the apps to the peer object!
            peer.apps = apps;
            peer.last_updated = new Date();
            model.updatePeer(peer, function(err, res){
                if(res){
                    peer._rev = res._rev;
                }
                callback(err, peer);
            });
        }
    });
}