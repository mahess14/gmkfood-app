import React from "react";
import { Link } from "react-router-dom";
import Image from '../images/maheshnav3.png';

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
    
  <Link to="/"><img src={Image} alt="Maheesh Logo" className="logo" /></Link>

      <ul className="navlink">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
     
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
