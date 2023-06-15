const express = require('express');
const router = express.Router();

const authsController = require('../app/controllers/AuthsController');

//router.get('/google', authsController.login);
//router.get('/google/callback', authsController.loginCallback);
router.get('/api/current_user', authsController.returnUser);
router.get('/api/logout', authsController.logout);
router.get('/users/allUser', authsController.allUser);


module.exports = router;