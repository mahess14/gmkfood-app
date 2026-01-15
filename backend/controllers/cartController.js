const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.menuItemId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  const { userId, menuItemId } = req.body;
  
  try {
    // Check if menu item exists
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    let cart = await Cart.findOne({ userId });
    
    // If cart doesn't exist, create one
    if (!cart) {
      cart = new Cart({ userId, items: [{ menuItemId }] });
    } else {
      // Check if item already exists in cart
      const existingItem = cart.items.find(item => item.menuItemId.toString() === menuItemId);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ menuItemId });
      }
    }
    
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { userId, itemId } = req.params;
  
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json({ message: 'Cart cleared successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};