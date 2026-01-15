import React from 'react';
import { Link } from 'react-router-dom';

import './Cart.css';

const Cart = ({ cart, showCart, setShowCart, removeFromCart, calculateTotal }) => {
  // Group items by ID and count quantities
  const cartItems = cart.reduce((acc, item) => {
    const existingItem = acc.find(i => i._id === item._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <div className={`cart-sidebar ${showCart ? 'show' : ''}`}>
      <div className="cart-header">
        <h3>Your Cart 🛒</h3>
        <button onClick={() => setShowCart(false)}>×</button>
      </div>
      
      {cart.length === 0 ? (
  <div className="empty-cart">
    <p>Your cart is empty</p>
    <Link to="/" className="continue-shopping-btn">
      Continue Shopping
    </Link>
  </div>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={`${item._id}-${index}`} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price} × {item.quantity}</p>
                  <div className="item-controls">
                    <button 
                      onClick={() => removeFromCart(cart.findIndex(i => i._id === item._id))}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Subtotal:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="cart-total">
              <span>Tax (5%):</span>
              <span>₹{(calculateTotal() * 0.05).toFixed(2)}</span>
            </div>
            <div className="cart-total grand-total">
              <span>Total:</span>
              <span>₹ {(calculateTotal() * 1.05).toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;