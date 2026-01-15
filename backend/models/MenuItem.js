const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['burger', 'pizza', 'pasta', 'noodles', 'salad', 'soup', 'dessert', 'roll', 'cake'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);