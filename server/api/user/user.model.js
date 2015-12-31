'use strict';

var _ = require('lodash');
var model = require('../../database/mongoIndex');
var keyGenerator = require('../key/key.generator.js');

var collection = 'users';

module.exports = {
    getUser:function(username, callback){
        model.getDatabase()
        .then(function(db){
          //users
          db.collection(collection).findOne({
            username:username
          }, function(err, user){
            callback(null, user);
          });
        });
    },
    findOrCreate:function(identifier, user, callback){
        console.log('Finding a user for identifier: ', identifier);
        model.getDatabase()
        .then(function(db){
          //users
          db.collection(collection).findOne({
            googleId:identifier.googleId
          }, function(err, u){
            if(u === null){
              var newUser = _.merge(user, identifier);
              console.log('creating user... ', JSON.stringify(newUser));
              db.collection(collection).insertMany([user], function(err, res){
                console.log('created user... ', JSON.stringify(res));
                callback(err, res);
              });
            } else {
              callback(null, u);
            }
          });
        });
    }
};
