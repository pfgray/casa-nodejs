
var storefrontModel = require('../api/storefronts/storefront.model');

var appModel = require('../api/application/application.model');
var lti = require('ims-lti');

// Get list of things
exports.lti = function(req, res) {
  //console.log("Got LTI launch...", req.body);

  //does there exist an appInstance (in this storefront), which has
  //an already created content item for this resource_link_id?
  //  if so, create a new lti request, that proxies to the provisioned lti app.
  //  if not, show the app selector ui (only if it's instructor/admin?).

  //not worrying about lti-'d users just yet:
    //does this user exist in this storefront?
      //if not, create them inside this store
      //if so, sign them in

  //find the storefront which this app
  storefrontModel.getStorefront(req.casa.db, req.params.storefront)
  .then(function(storefront){
    var keypair = storefront.keypairs.find(function(keypair){
      return req.body.oauth_consumer_key === keypair.key;
    });
    if(keypair){
      return {
        storefront: storefront,
        keypair: keypair
      };
    } else {
      throw new Error("Couldn't find key: <" + req.body.oauth_consumer_key + "> for storefront: <" + req.params.storefront + ">");
    }
  })
  .then(function(info){
    var provider = new lti.Provider(info.keypair.key, info.keypair.secret, lti.MemoryStore, lti.HMAC_SHA1);
    provider.valid_request(req, function(err, isValid){
      if(!isValid){
        throw new Error("Signature mismatch");
      } else {
        console.log("successfully validated lti launch");
      }
    });
    req.session.lti = {
      store: req.params.storefront,
      resource_link_id: req.body.resource_link_id
    };
    res.redirect(303, "/store");
  }, function(err){
    console.log('error validating lti launch: ', err);
    console.log(err.stack);
    res.json({
        status:'error',
        message:err
    }, 500);
  })
  .catch(function(err){
    console.log('error validating lti launch: ', err);
    console.log(err.stack);
    res.json({
        status:'error',
        message:err
    }, 500);
  });

};

exports.appStore = function(req, res) {
  console.log('whaaaaat');
  res.json([]);
};
