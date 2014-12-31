'use strict';

var express = require('express');
var controller = require('./payload.controller');
//var authorized = require('../../components/authorize');

var router = express.Router();

router.get('/', controller.index);
//router.get('/:originatorId/:appId', controller.outPayload);

module.exports = router;
