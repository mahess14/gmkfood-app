const mongoose = require("mongoose");
 const orderSchema = new mongoose.Schema( { 
    items: [ { name: String, price: Number, quantity: Number } ], 
    totalAmount: { type: Number, required: true }, 
    paymentMethod: { type: String, enum: ["cod", "upi", "card"],
         required: true }, paymentStatus: { type: String, default: "SUCCESS" } }, 
         { timestamps: true } ); 
         module.exports = mongoose.model("Order", orderSchema);