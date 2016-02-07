'use strict';

var _ = require('lodash');
var model = require('./peer.model');

// Get list of things
exports.index = function(req, res) {
    console.log("Getting peers with user: ", req.user._id);

    model.getPeersByUser(req.casa.db, req.user._id)
    .then(function(peers){
      res.json(peers);
    }, function(err){
      console.log('error getting peers: ', err);
      res.json({
          status:'error',
          message:err
      }, 500);
    });
};

exports.fetch = function(req, res) {
    console.log("Getting peer with id: ", req.params.peer);

    model.getPeer(req.casa.db, req.params.peer)
    .then(function(peer){
      console.log('Found peer:', peer);
      if(req.user._id !== peer.userId){
        res.json({
            status:'error',
            message:"You can't look at other's peers"
        }, 403);
      } else {
        res.json(peer);
      }
    }, function(err){
      console.log('error getting peer: ', err);
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
    if(!req.body.payloadUrl || req.body.payloadUrl.trim() === ''){
        errors.push({
            field:'payloadUrl',
            error:'Cannot be blank'
        });
    }

    if(errors.length > 0){
        res.json(errors, 400);
        return;
    }
    var peer = {
        name:req.body.name,
        payloadUrl:req.body.payloadUrl,
        userId: req.user._id,
        lastUpdated:null
    };
    model.createPeer(req.casa.db, peer)
    .then(function(newPeer){
        //TODO: get the peer by id from the db
        peer._id  = newPeer._id;
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
  function handleErr(err){
    console.log('error deleting peer', err, err.stack);
    res.status(500).json(err);
  }
  console.log("deleting peer with id: ", req.params.peer);
  model.getPeer(req.casa.db, req.params.peer).then(function(peer) {
    console.log("got peer:", peer);
    if(req.user._id === peer.userId){
      model.deletePeer(req.casa.db, peer._id)
      .then(function(result){
        res.json(result);
      }, handleErr);
    } else {
      res.status(403).json({
        message:"You can only delete your own peers"
      });
    }
  })
  .catch(handleErr);
};
