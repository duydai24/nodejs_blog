const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');

router.get('/allUser', usersController.allUser);
router.get('/:id/edit', usersController.edit);
router.put('/:id', usersController.update);



module.exports = router;