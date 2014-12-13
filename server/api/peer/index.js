'use strict';

var express = require('express');
var controller = require('./peer.controller');
var operations = require('./peer.operations');

var router = express.Router();

router.get('/', controller.index);
router.post('/:peer/updates', operations.createUpdateOperation);

module.exports = router;
