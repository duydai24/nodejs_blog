"use strict";

var express = require('express');
var router = express.Router();
var meController = require('../app/controllers/MeController');
router.get('/stored/courses', meController.storedCourses);
//router.post('/store', meController.store);
//router.get('/:slug', meController.show);
//router.get('/', mesController.index);

module.exports = router;