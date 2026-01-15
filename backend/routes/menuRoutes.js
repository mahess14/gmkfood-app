const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET all menu items
router.get('/', menuController.getAllMenuItems);

// GET single menu item
router.get('/:id', menuController.getMenuItemById);

// POST add new menu item (protected in production)
router.post('/', menuController.addMenuItem);

module.exports = router;