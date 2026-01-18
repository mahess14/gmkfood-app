import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  // ✅ Get data from localStorage
  const totalAmount = localStorage.getItem("totalAmount");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const handlePayment = async () => {
    try {
      // ✅ Send order to backend
      const response = await fetch(
        "http://localhost:5000/api/orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            items: cartItems,
            totalAmount: Number(totalAmount),
            paymentMethod: method
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        // ✅ Payment success message
        if (method === "cod") {
          alert("✅ Order placed successfully (Cash on Delivery)");
        } else if (method === "upi") {
          alert("📱 UPI Payment Successful");
        } else if (method === "card") {
          alert("💳 Card Payment Successful");
        }

        // ✅ Clear cart & total
        localStorage.removeItem("cart");
        localStorage.removeItem("totalAmount");

        // ✅ Redirect to Menu page
        navigate("/menu");
      } else {
        alert("❌ Order failed");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error. Try again.");
    }
  };

  return (
    <div className="payments-container">
      <h2>Payment Method</h2>

      <div className="payments-option">
        <input
          type="radio"
          name="payment"
          value="cod"
          checked={method === "cod"}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label>Cash on Delivery</label>
      </div>

      <div className="payments-option">
        <input
          type="radio"
          name="payment"
          value="upi"
          onChange={(e) => setMethod(e.target.value)}
        />
        <label>  UPI (Google Pay  / PhonePe)</label>
      </div>

      <div className="payments-option">
        <input
          type="radio"
          name="payment"
          value="card"
          onChange={(e) => setMethod(e.target.value)}
        />
        <label>Debit / Credit Card</label>
      </div>

      {method === "card" && (
        <div className="card-form">
          <input type="text" placeholder="Card Number" />
          <input type="text" placeholder="Expiry Date (MM/YY)" />
          <input type="password" placeholder="CVV" />
        </div>
      )}

      <h3>Total Amount: ₹{totalAmount}</h3>

      <button className="pay-btn" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
