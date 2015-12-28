var _ = require('lodash');
var casa_model = require('../../database');

var model = require('../../database/mongoIndex');
var collection = 'peers';
var Q = require('q');


module.exports = {
    getPeers:function(callback){
        var db = casa_model.getDatabase();
        db.view('casa/peers', null, function (err, res) {
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            }));
        });
    },
    getPeersByUser:function(userId){
        return model.getDatabase()
        .then(function(db){
          return Q.ninvoke(db.collection(collection).find({
            userId: userId
          }), 'toArray');
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
    createPeer:function(peer){
      return model.getDatabase()
      .then(function(db){
        return Q.ninvoke(db.collection(collection), 'insert', peer);
      });
    },
    deletePeer:function(id, rev, callback){
        var db = casa_model.getDatabase();
        db.remove(id, rev, function (err, res) {
            callback(err, res);
        });
    }
}
