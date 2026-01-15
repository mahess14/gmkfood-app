import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import Cart from './Cart';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const categories = ['all', 'burger', 'pizza', 'pasta', 'noodles', 'salad', 'soup', 'dessert'];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        
        setMenuItems(response.data);
      } catch (err) {
        setError('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item) => {
    setCart([...cart, item]);
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (index) => {
    const removedItem = cart[index];
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    toast.info(`${removedItem.name} removed from cart`);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  if (loading) return <div className="loading">Loading menu...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="menu-title">Our Menu</h1>
        <button className="view-cart-btn" onClick={() => setShowCart(true)}>
          View Cart ({cart.length})
        </button>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item._id} className="menu-item-card">
            <div className="item-image-container">
              <img src={item.image} alt={item.name} />
              <span className="price-badge">₹ {item.price}</span>
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      <Cart
        cart={cart}
        showCart={showCart}
        setShowCart={setShowCart}
        removeFromCart={removeFromCart}
        calculateTotal={calculateTotal}
      />
    </div>
  );
};

export default Menu;
