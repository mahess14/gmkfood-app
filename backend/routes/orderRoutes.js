const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ Create Order
router.post("/create", async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    const order = new Order({
      items,
      totalAmount,
      paymentMethod
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order failed",
      error: error.message
    });
  }
});

// ✅ Get all orders (Admin)
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
