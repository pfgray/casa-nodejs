'use strict';

var _ = require('lodash');
var model = require('./peer.model');

// Get list of things
exports.index = function(req, res) {
    console.log("Getting peers with user: ", req.user._id);

    model.getPeersByUser(req.user._id)
    .then(function(peers){
      res.json(peers);
    }, function(err){
      console.log('error getting apps: ', err);
      res.json({
          status:'error',
          message:err
      }, 500);
    });
};

exports.create = function(req, res) {
    var errors = [];
    console.log("Creating peer with user: ", req.user._id);
    if(!req.body.name || req.body.name.trim() === ''){
        errors.push({
            field:'name',
            error:'Cannot be blank'
        });
    }
    if(!req.body.payload_url || req.body.payload_url.trim() === ''){
        errors.push({
            field:'payload_url',
            error:'Cannot be blank'
        });
    }

    if(errors.length > 0){
        res.json(errors, 400);
        return;
    }
    var peer = {
        name:req.body.name,
        payload_url:req.body.payload_url,
        userId: req.user._id,
        last_updated:null
    };
    model.createPeer(peer).then(function(newPeer){
        //TODO: get the peer by id from the db
        peer._id  = newPeer.id;
        peer._rev = newPeer.rev;
        peer.app_count = 0;
        res.json(peer);
    })
    .catch(function(err){
        console.log('error creating peer: ', err, err.stack);
        res.status(500).json({
            status:'error',
            message:err
        });
    });
};

exports.delete = function(req, res) {
    model.getPeer(req.params.peer, function(err, peer){
        model.deletePeer(req.params.peer, peer._rev, function(err, result){
            if(err){
                console.log('error deleting peer', err);
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
