const express = require('express');
const router = express.Router()
const orderController = require('../controllers/order.controllers')
const authenticateToken = require('../middlewares/auth.middleware')

router.post("/from-cart", authenticateToken,orderController.placeOrderFromCart);
router.post("/user",authenticateToken,orderController.getOrderByUser);
router.post("/get-order-by-id",authenticateToken,orderController.getOrderById)
router.post("/get-all-orders",authenticateToken,orderController.getAllOrders)
module.exports = router