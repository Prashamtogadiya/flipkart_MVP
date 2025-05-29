const express = require('express')
const router = express.Router()
const cartController= require('../controllers/cart.controllers')
const authenticateToken = require('../middlewares/auth.middleware')

router.post('/get-cart',authenticateToken,cartController.getCart)
router.post('/:userId',authenticateToken,cartController.addToCart)
router.put('/:userId',authenticateToken,cartController.updateCartItem)
router.delete('/:userId',authenticateToken,cartController.removeCartItem)
router.delete('/clear-cart/:userId',authenticateToken,cartController.clearCart)

module.exports = router