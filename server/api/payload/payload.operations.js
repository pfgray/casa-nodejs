'use strict';


exports.adjOutFilter = function(apps){
    var filteredApps = [];
    _.each(apps, function(app){
        if(typeof app.attributes.share === 'undefined' || app.attributes.share === true){
            filteredApps.push(app);
        }
    });
    return filteredApps;
};

exports.adjOutTransform = function(apps){
    _.each(apps, function(app){
        if(!app.original){
            app.original = app.attributes;
        }
        if(app.attributes.propagate){
            app.attributes.share = false;
        }
    });
    return apps;
};
