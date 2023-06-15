const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

router.get('/create', productsController.create);
router.post('/store', productsController.store);
router.get('/:id/edit', productsController.edit);
router.post('/handle-form-action', productsController.handleFormAction);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.deleteProduct);
router.patch('/:id/restore', productsController.restore);
router.delete('/:id/forever', productsController.deleteProductForever);
router.get('/:slug', productsController.show);
router.get('/', productsController.index);


module.exports = router;