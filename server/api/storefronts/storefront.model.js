var _ = require('lodash');

var Q = require('q');
var mongodb = require('mongodb');
var model = require('../../database');
var randomstring = require("randomstring");

var collection = 'storefront';

module.exports = {
    getStorefront:function(db, storefrontId){
      return Q.ninvoke(db.collection(collection), 'findOne', {
        _id: new mongodb.ObjectID(storefrontId)
      });
    },
    getStorefrontsByUser:function(db, userId){
      return Q.ninvoke(db.collection(collection).find({
        userId: userId
      }), 'toArray');
    },
    updateStorefront:function(db, storefront){
      console.log("saving storefront:", storefront);
      return Q.ninvoke(db.collection(collection), 'save', storefront);
    },
    createStorefront:function(db, storefront){
      // initiate this storefront with one keypair
      storefront.keypairs = [{
        key: randomstring.generate(),
        secret: randomstring.generate()
      }];
      return Q.ninvoke(db.collection(collection), 'insert', storefront)
        .then(function(result){
          return result.ops[0];
        });
    },
    deletePeer:function(db, id){
      return Q.ninvoke(db.collection(collection), 'remove', {
        _id: new mongodb.ObjectID(id)
      });
    }
}
