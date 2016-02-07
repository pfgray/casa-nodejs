'use strict';

var express = require('express');
var controller = require('./peer.controller');
var operations = require('./peer.operations');
var authorized = require('../../components/authorize');
var authGuard = require('../../components/authorize/authenticationGuard');
var injectDb = require('../../database/injectDb');

var router = express.Router();

router.get('/', injectDb, authGuard, controller.index);
router.post('/', injectDb, authGuard, controller.create);
router.get('/:peer', injectDb, authGuard, controller.fetch);
router.delete('/:peer', injectDb, authGuard, controller.delete);
router.post('/:peer/updates', injectDb, authGuard, operations.createUpdateOperation);

module.exports = router;
