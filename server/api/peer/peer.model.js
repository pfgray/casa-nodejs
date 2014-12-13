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
    }
}
