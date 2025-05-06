const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get cart contents
router.get('/', cartController.getCart);

// Add to cart
router.post('/', cartController.addToCart);

// Remove from cart
router.delete('/', cartController.removeFromCart);

// Checkout
router.post('/checkout', cartController.checkoutCart);

module.exports = router;