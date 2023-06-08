const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CourseController');

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.put('/create', coursesController.create);
router.post('/handle-form-action', coursesController.handleFormAction);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.deleteCourse);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id/forever', coursesController.deleteCourseForever);
router.get('/:slug', coursesController.show);
router.get('/', coursesController.index);


module.exports = router;
