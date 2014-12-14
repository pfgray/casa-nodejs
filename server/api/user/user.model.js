'use strict';

var _ = require('lodash');
var casa_model = require('../../database');

module.exports = {
    getUser:function(username, callback){
        var db = casa_model.getDatabase();
        db.view('casa/users', {key:username}, function (err, res) {
            //TODO: is there a better way to find a single entity?
            callback(err, _.transform(res, function(result, entity){
                return result.push(entity.value);
            })[0]);
        });
    }
}
