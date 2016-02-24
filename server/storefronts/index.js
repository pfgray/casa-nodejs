'use strict';

var express = require('express');
var controller = require('./application.controller');
var injectDb = require('../../database/injectDb');

var router = express.Router();

router.post('/', injectDb, controller.index);

module.exports = router;
