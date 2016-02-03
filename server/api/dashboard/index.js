'use strict';

var express = require('express');
var controller = require('./dashboard.controller');
var injectDb = require('../../database/injectDb');

var router = express.Router();

router.get('/', injectDb, controller.index);

module.exports = router;
