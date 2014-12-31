'use strict';

var _ = require('lodash');
var model = require('../application/application.model');
var operations = require('./payload.operations');

// Get list of things
exports.index = function(req, res) {
    model.getApplications(function(err, apps){
        if(err){
            console.log('error getting apps: ', err);
            res.json({
                status:'error',
                message:err
            }, 500);
        } else {
            apps = operations.adjOutTransform(apps);
            console.log(apps.length);
            apps = operations.adjOutFilter(apps);
            console.log(apps.length);
            apps = operations.adjOutTranslate(apps);
            console.log(apps.length);
            res.status(200).json(apps);
        }
    });
};
