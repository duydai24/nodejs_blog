const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/courses', meController.storedCourses);
//router.post('/store', meController.store);
//router.get('/:slug', meController.show);
//router.get('/', mesController.index);


module.exports = router;
