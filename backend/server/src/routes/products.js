//Rutas para productos
const express = require('express');
const productRouter = express.Router();
const productController  = require('../controllers/products');

// api/products
productRouter.get('/:id?', productController.getProduct);
productRouter.post('/', productController.createProduct);
productRouter.put('/:id', productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;