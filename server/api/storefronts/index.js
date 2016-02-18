'use strict';

var express = require('express');
var controller = require('./storefront.controller');
var authorized = require('../../components/authorize');
var authGuard = require('../../components/authorize/authenticationGuard');
var injectDb = require('../../database/injectDb');

var router = express.Router();

router.get('/', injectDb, authGuard, controller.index);
router.post('/', injectDb, authGuard, controller.create);
router.get('/:storefront', injectDb, authGuard, controller.fetch);
router.delete('/:storefront', injectDb, authGuard, controller.delete);

module.exports = router;
