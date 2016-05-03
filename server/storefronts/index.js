'use strict';

var express = require('express');
var controller = require('./storefronts.controller');
var injectDb = require('../database/injectDb');

var router = express.Router();

router.post('/:storefront/lti', injectDb, controller.lti);
router.get('/:storefront/config.xml', injectDb, controller.appStoreConfig);
router.get('/:storefront/launches', injectDb, controller.totalLaunches);

//todo: how to only enable this in 'dev' mode?
router.get('/:storefront/ltidev', injectDb, controller.ltidev);

module.exports = router;
