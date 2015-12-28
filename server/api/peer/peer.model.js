var _ = require('lodash');

var Q = require('q');
var mongodb = require('mongodb');
var model = require('../../database/mongoIndex');
var collection = 'peers';

module.exports = {
    getPeer:function(peerId){
      return model.getDatabase()
      .then(function(db){
        return Q.ninvoke(db.collection(collection), 'findOne', {
          _id: new mongodb.ObjectID(peerId)
        });
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
    updatePeer:function(peer, callback){
      return model.getDatabase()
      .then(function(db){
        return Q.ninvoke(db.collection(collection), 'save', peer);
      });
    },
    createPeer:function(peer){
      return model.getDatabase()
      .then(function(db){
        return Q.ninvoke(db.collection(collection), 'insert', peer);
      });
    },
    deletePeer:function(id){
      return model.getDatabase()
      .then(function(db){
        return Q.ninvoke(db.collection(collection), 'remove', {
          _id: new mongodb.ObjectID(id)
        });
      });
    }
}
