const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controllers');
const authenticateToken = require('../middlewares/auth.middleware');

/**
 * Route to place an order using the current user's cart
 * Protected route - requires valid authentication token
 */
router.post("/from-cart", authenticateToken, orderController.placeOrderFromCart);

/**
 * Route to get all orders placed by a specific user
 * Protected route - requires valid authentication token
 */
router.post("/user", authenticateToken, orderController.getOrderByUser);

/**
 * Route to get a specific order by its ID
 * Protected route - requires valid authentication token
 */
router.post("/get-order-by-id", authenticateToken, orderController.getOrderById);

/**
 * Route to get all orders from the database (admin use case)
 * Protected route - requires valid authentication token
 */
router.post("/get-all-orders", authenticateToken, orderController.getAllOrders);

module.exports = router;
