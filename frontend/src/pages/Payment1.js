import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const totalAmount = Number(localStorage.getItem("totalAmount")) || 0;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Group items by ID + quantity for backend
  const items = cart.reduce((acc, item) => {
    const found = acc.find(i => i.productId === item._id);
    if (found) {
      found.quantity += 1;
    } else {
      acc.push({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: 1
      });
    }
    return acc;
  }, []);

  const handlePayment = async () => {
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    await fetch("http://localhost:5000/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        totalAmount,
        paymentMethod: method
      })
    });

    alert("✅ Order placed successfully");

    // Clear cart + total
    localStorage.removeItem("cart");
    localStorage.removeItem("totalAmount");

    navigate("/menu");
  };

  return (
    <div className="payment-container">
      <h2>Payment Method</h2>

      <div>
        <input type="radio" name="payment" value="cod" checked={method==="cod"} onChange={e => setMethod(e.target.value)} /> Cash on Delivery
      </div>
      <div>
        <input type="radio" name="payment" value="upi" onChange={e => setMethod(e.target.value)} /> UPI
      </div>
      <div>
        <input type="radio" name="payment" value="card" onChange={e => setMethod(e.target.value)} /> Card
      </div>

      {method === "card" && (
        <div>
          <input type="text" placeholder="Card Number" />
          <input type="text" placeholder="Expiry MM/YY" />
          <input type="password" placeholder="CVV" />
        </div>
      )}

      <h3>Total: ₹{totalAmount}</h3>

      <button className="pay-btn" onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
