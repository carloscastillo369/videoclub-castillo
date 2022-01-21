//Rutas para ordenes
const express = require('express');
const orderRouter = express.Router();
const orderController  = require('../controllers/orders');

// api/orders
orderRouter.get('/:id?', orderController.getOrder);
orderRouter.post('/', orderController.createOrder);

module.exports = orderRouter;