'use strict';

var express = require('express');
var controller = require('./application.controller');
var injectDb = require('../../database/injectDb');

var router = express.Router();

router.get('/', injectDb, controller.index);
router.get('/:originatorId/:appId', injectDb, controller.getApp);

module.exports = router;
