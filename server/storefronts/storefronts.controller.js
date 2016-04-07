
var fs = require('fs');
var ejs = require('ejs');

var environment = require('../config/environment');
var storefrontModel = require('../api/storefronts/storefront.model');

var appModel = require('../api/application/application.model');
var launchModel = require('./launches/launches.model');
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
        throw err;
      } else {
        console.log("successfully validated lti launch");
        //store information about this launch:
        launchModel.createStorefrontLaunch(req.casa.db, req.params.storefront, req.body)
        .then(function(){
          req.session.lti = {
            store: req.params.storefront,
            resource_link_id: req.body.resource_link_id
          };
          res.redirect(303, "/store");
        });
      }
    });
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
  if(req.session.lti.store !== req.params.storefront){
    console.log('they werent equal...');
    res.status(403).json({
      error: "You must lti launch into this store to access it"
    });
  } else {
    //find all apps in this storefront...
    appModel.getApplicationsForStorefront(req.casa.db, req.params.storefront)
    .then(function(apps){
      res.json(apps);
    })
    .catch(function(err){
      console.log('error validating lti launch: ', err);
      console.log(err.stack);
      res.json({
          status:'error',
          message:err
      }, 500);
    });
  }
};

var ltiXmlConfigTemplate = fs.readFileSync('./server/storefronts/storefrontLtiConfig.xml', 'utf8');

exports.appStoreConfig = function(req, res) {
  console.log('getting config for: ', req.params.storefront);
  storefrontModel.getStorefront(req.casa.db, req.params.storefront)
  .then(function(storefront){
    //console.log('rendering config for storefront: ', storefront);
    res.set('Content-Type', 'application/xml');
    res.send(ejs.render(ltiXmlConfigTemplate, {
      name: storefront.name,
      launchUrl: environment.domain + '/stores/' + storefront._id + '/lti'
    }));
  });
}

exports.totalLaunches = function(req, res) {
  launchModel.getTotalLaunchesForStorefronts(req.casa.db, [req.params.storefront])
  .then(function(result){
    console.log('the result is:', result);
    res.json(result);
  }).catch(function(err){
    console.log('error:', err);
    res.json(err);
  })
};
