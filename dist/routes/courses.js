"use strict";

var express = require('express');
var router = express.Router();
var coursesController = require('../app/controllers/CourseController');
router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.get('/:slug', coursesController.show);
router.get('/', coursesController.index);
module.exports = router;