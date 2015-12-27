var MongoClient = require('mongodb').MongoClient;

module.exports = {
  init: function(config){
    //todo: use config...
    var db_name = 'casa';
    var host = 'localhost';
    var port = 27017
    this.url = 'mongodb://' + host + ':' + port + '/' + db_name;
  },
  getDatabase:function(cb){
    var db_name = 'casa';
    var host = 'localhost';
    var port = 27017
    var url = 'mongodb://' + host + ':' + port + '/' + db_name;
    MongoClient.connect(url, function(err, db) {
      if(err){
        console.log("error conneccting to mongo db (" + this.url + ")");
        cb(err);
      }
      cb(null, db);
    });
  }
};
