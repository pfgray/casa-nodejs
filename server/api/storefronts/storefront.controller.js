'use strict';

var _ = require('lodash');
var model = require('./storefront.model');

// Get list of things
exports.index = function(req, res) {
    console.log("Getting storefronts for user: ", req.user._id);

    model.getStorefrontsByUser(req.casa.db, req.user._id)
    .then(function(storefronts){
      res.json(storefronts);
    }, function(err){
      console.log('error getting storefronts: ', err);
      res.json({
        status:'error',
        message:err
      }, 500);
    });
};

exports.fetch = function(req, res) {
    console.log("Getting storefronts with id: ", req.params.storefront);

    model.getStorefront(req.casa.db, req.params.storefront)
    .then(function(storefront){
      console.log('Found storefront:', storefront);
      if(req.user._id !== storefront.userId){
        res.json({
            status:'error',
            message:"You can't look at other's storefronts"
        }, 403);
      } else {
        res.json(storefront);
      }
    }, function(err){
      console.log('error getting storefront: ', err);
      res.json({
          status:'error',
          message:err
      }, 500);
    });
};

exports.create = function(req, res) {
    var errors = [];
    console.log("Creating storefront with user: ", req.user._id);
    var storefront = {
        name:req.body.name,
        userId: req.user._id
    };
    model.createStorefront(req.casa.db, storefront)
    .then(function(newPeer){
        //TODO: get the storefront by id from the db
        storefront._id  = newPeer._id;
        storefront.app_count = 0;
        res.json(storefront);
    })
    .catch(function(err){
        console.log('error creating storefront: ', err, err.stack);
        res.status(500).json({
            status:'error',
            message:err
        });
    });
};

exports.delete = function(req, res) {
  function handleErr(err){
    console.log('error deleting storefront', err, err.stack);
    res.status(500).json(err);
  }
  console.log("deleting storefront with id: ", req.params.storefront);
  model.getStorefront(req.casa.db, req.params.storefront).then(function(storefront) {
    console.log("got storefront:", storefront);
    if(req.user._id === storefront.userId){
      model.deletePeer(req.casa.db, storefront._id)
      .then(function(result){
        res.json(result);
      }, handleErr);
    } else {
      res.status(403).json({
        message:"You can only delete your own storefronts"
      });
    }
  })
  .catch(handleErr);
};
