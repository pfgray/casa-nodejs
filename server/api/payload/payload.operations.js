'use strict';

var _ = require('lodash');
var casa_config = require('../../config/casa.js');

exports.adjOutFilter = function(apps){
    console.log('adjOutFilter...');
    var filteredApps = [];
    _.each(apps, function(app){
        if(typeof app.attributes.share === 'undefined' || app.attributes.share === true){
            filteredApps.push(app);
        }
    });
    return filteredApps;
};

exports.adjOutTransform = function(apps){
    console.log('adjOutTransform...');
    _.each(apps, function(app){
        if(!app.original){
            app.original = app.attributes;
        }
        if(!app.attributes.propagate){
            app.attributes.share = false;
        }
    });
    return apps;
};

var invert = function (obj) {
    var new_obj = {};
    for (var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            new_obj[obj[prop]] = prop;
        }
    }
    return new_obj;
};

exports.adjOutTranslate = function(apps){
    console.log('adjOutTranslate...');
    var value_config = invert(casa_config.uuid_human);
    function translateObject(object){
        for(var key in object){
            if(value_config[key]){
                //check if we have a human readable string for this uuid key
                object[value_config[key]] = object[key];
                delete object[key];
            } else {
                return false;
            }
        }
        return true;
    }
    var translatedApps = [];
    _.each(apps, function(app) {
        var appIsValid = true;

        translateObject(app.original.use);
        if(!translateObject(app.original.require)){
            appIsValid = false;
        }

        if(app.attributes) {
            translateObject(app.attributes.use);
            if(!translateObject(app.attributes.require)){
                appIsValid = false;
            }
        }

        _.each(app.journal, function(journal_entry){
            translateObject(journal_entry.use);
            if(!translateObject(journal_entry.require)){
                appIsValid = false;
            }
        });

        if(appIsValid){
            translatedApps.push(app);
        }
    });
    return translatedApps;
};
