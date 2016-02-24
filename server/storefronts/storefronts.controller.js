
var model = require('../api/storefronts/storefront.model');

// Get list of things
exports.lti = function(req, res) {
    console.log("Got LTI launch...", req.params);

    model.getStorefront(req.casa.db, req.params.storefront)
    .then(function(storefronts){
      res.redirect(303, "/store/" + req.params.storefront);
    }, function(err){
      console.log('error getting storefronts: ', err);
      res.json({
          status:'error',
          message:err
      }, 500);
    });
};
