var Q = require('q');
var model = require('./index.js');

module.exports = function(req, res, next){
  model.getDatabase()
  .then(function(db){
    req.casa = req.casa || {};
    req.casa.db = db;
    next();
    res.on('finish', function(){
      db.close();
    });
  })
  .catch(function(err){
    res.status(500).json({
      message: "Server error."
    })
  });
};
