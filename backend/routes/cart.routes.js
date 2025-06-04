const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controllers');
const authenticateToken = require('../middlewares/auth.middleware');

// Get the cart details of a specific user
router.post('/get-cart', authenticateToken, cartController.getCart);

// Add a product to a specific user's cart (userId provided in the URL)
router.post('/:userId', authenticateToken,  cartController.addToCart);

// Update a specific item in a user's cart
router.put('/:userId', authenticateToken, cartController.updateCartItem);

// Remove a specific item from a user's cart
router.delete('/:userId', authenticateToken, cartController.removeCartItem);

// Clear all items from a user's cart
router.delete('/clear-cart/:userId', authenticateToken, cartController.clearCart);

module.exports = router;
