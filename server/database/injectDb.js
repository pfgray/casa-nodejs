var Q = require('q');
var model = require('./mongoIndex');

module.exports = function(req, res, next){
  model.getDatabase()
  .then(function(db){
    req.casa = req.casa || {};
    req.casa.db = db;
    next();
    res.on('finish', function(){
      console.log("now closing the connection....");
      db.close();
    });
  })
  .catch(function(err){
    res.status(500).json({
      message: "Server error."
    })
  });
};
