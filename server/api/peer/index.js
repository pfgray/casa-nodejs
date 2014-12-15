'use strict';

var express = require('express');
var controller = require('./peer.controller');
var operations = require('./peer.operations');
var authorized = require('../../components/authorize');

var router = express.Router();

router.get('/', controller.index);
router.post('/', /*authorized('admin'),*/ controller.create);
router.delete('/:peer', /*authorized('admin'),*/ controller.delete);
router.post('/:peer/updates', /*authorized('admin'),*/ operations.createUpdateOperation);

module.exports = router;
