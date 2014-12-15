'use strict';

var express = require('express');
var controller = require('./application.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:originatorId/:appId', controller.getApp);

module.exports = router;
