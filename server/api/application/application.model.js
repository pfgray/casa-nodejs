'use strict';

var _ = require('lodash');
var casa_model = require('../../database');

module.exports = {
  getApplications:function(callback){
    console.log('getting a new connection...');
    var db = casa_model.getDatabase();
    console.log('calling view');
    db.view('casa/applications', null, function (err, res) {
      console.log('got response, calling callback...');
      callback(err, _.transform(res, function(result, entity){
        return result.push(entity.value);
      }));
    });
  }
}
