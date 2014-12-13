'use strict';

var _ = require('lodash');
var model = require('./peer.model');

// Get list of things
exports.index = function(req, res) {
    console.log('yeilding to model');
    model.getPeers(function(err, apps){
        if(err){
            console.log('error getting apps: ', err);
            res.json({
                status:'error',
                message:err
            });
        } else {
            res.json(apps);
        }
    });
};
