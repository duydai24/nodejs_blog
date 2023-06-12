const express = require('express');
const router = express.Router();

const APIController = require('../app/controllers/APIController');
router.get('/products', APIController.apiProducts);

module.exports = router;
