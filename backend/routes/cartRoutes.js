const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET user's cart
router.get('/:userId', cartController.getCart);

// POST add item to cart
router.post('/', cartController.addToCart);

// DELETE remove item from cart
router.delete('/:userId/items/:itemId', cartController.removeFromCart);

// DELETE clear cart
router.delete('/:userId', cartController.clearCart);

module.exports = router;