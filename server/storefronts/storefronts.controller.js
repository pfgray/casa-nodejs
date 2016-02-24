
var model = require('../api/storefronts/storefront.model');

var appModel = require('../api/application/application.model');

// Get list of things
exports.lti = function(req, res) {
  console.log("Got LTI launch...", req.body);

  //does there exist an appInstance (in this storefront),
  //an already created content item for this resource_link_id?
  //  if so, create a new lti request, that proxies to the provisioned lti app.
  //  if not, show the app selector ui (only if it's instructor/admin?).

  //not worrying about lti-'d users just yet:
    //does this user exist in this storefront?
      //if not, create them inside this store
      //if so, sign them in

  appModel.getApplicationsForStorefront(req.casa.db, req.params.storefront)
  .then(function(apps){
    req.session.lti = {
      store: req.params.storefront,
      resource_link_id: req.body.resource_link_id
    };
    res.redirect(303, "/store/" + req.params.storefront);
  }, function(err){
    console.log('error getting storefronts: ', err);
    console.log(err.stack);
    res.json({
        status:'error',
        message:err
    }, 500);
  });
};
