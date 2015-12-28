var MongoClient = require('mongodb').MongoClient;
var Q = require('q');

module.exports = {
  init: function(config){
    //todo: use config...
    var db_name = 'casa';
    var host = 'localhost';
    var port = 27017
    this.url = 'mongodb://' + host + ':' + port + '/' + db_name;
  },
  getDatabase:function(){
    var db_name = 'casa';
    var host = 'localhost';
    var port = 27017
    var url = 'mongodb://' + host + ':' + port + '/' + db_name;

    var connection = {};
    return Q.nfcall(MongoClient.connect, url)
      .then(function(db){
        connection = db;
        return db;
      })
      .catch(function(err){
        console.log("error connecting to mongo db using: (" + this.url + ")", err, err.stack);
        if(connection){
          console.log("Closing connection");
          connection.close();
        }
        throw err;
      });
  }
};
