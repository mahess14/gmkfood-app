import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>🍽️ Welcome to maheesh 🍽️</h1>
        <p>Delicious food delivered to your doorstep.</p>
        <Link to="/menu" className="menu-btn">View Menu</Link>
      </div>
    </div>
  );
};

export default Home;