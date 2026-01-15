import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Social Media Icons (optional) */}
      <div className="footer-social">
        <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
        <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
        <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
        <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
      </div>
      
   
      
     
      
      <p>© 2025 Maheesh.All rights reserved.</p>
    </footer>
  );
};

export default Footer;