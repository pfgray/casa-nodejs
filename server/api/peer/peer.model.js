'use strict';

var _ = require('lodash');
var casa_model = require('../../database');

module.exports = {
    getPeers:function(callback){
        var db = casa_model.getDatabase();
        db.view('casa/peers', null, function (err, res) {
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            }));
        });
    },
    getPeer:function(id, callback){
        var db = casa_model.getDatabase();
        db.view('casa/peers', {key:id}, function (err, res) {
            //TODO: is there a better way to find a single entity?
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            })[0]);
        });
    },
    updatePeer:function(peer, callback){
        var db = casa_model.getDatabase();
        db.save(peer._id, peer._rev, peer, function (err, res) {
            callback(err, res);
        });
    },
    createPeer:function(peer, callback){
        var db = casa_model.getDatabase();
        db.save(peer, function (err, res) {
            callback(err, res);
        });
    },
    deletePeer:function(id, rev, callback){
        var db = casa_model.getDatabase();
        db.remove(id, rev, function (err, res) {
            callback(err, res);
        });
    }
}
