"use strict";

var express = require('express');
var router = express.Router();
var newsController = require('../app/controllers/NewsController');
router.get('/:slug', newsController.show);
router.get('/', newsController.index);
module.exports = router;