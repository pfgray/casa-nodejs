'use strict';

var express = require('express');
var controller = require('./storefronts.controller');
var injectDb = require('../database/injectDb');

var router = express.Router();

router.post('/:storefront/lti', injectDb, controller.lti);
router.get('/:storefront/launches', injectDb, controller.totalLaunches);

module.exports = router;
