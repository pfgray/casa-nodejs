'use strict';

var _ = require('lodash');
var Q = require('q');
var model = require('../../database');
var keyGenerator = require('../key/key.generator.js');

var collection = 'users';

module.exports = {
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
    },
    getUserByEmail: function(db, email){
      console.log('finding user...');
      return Q.ninvoke(db.collection(collection), 'findOne', {
        email: email
      }).then(function(user){
        console.log('okay, we found: ', user);
        return user;
      });
    },
    createUser: function(db, user){
      return Q.ninvoke(db.collection(collection), 'insert', user)
        .then(function(result){
          console.log('got back: ', result);
          return result.ops[0];
        });
    }
};
