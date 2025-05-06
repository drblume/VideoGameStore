import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <h1>Cartridge Classics</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>
      </header>
      
      <main>{children}</main>
      
      <footer>
        <p>&copy; 2025 Cartridge Classics. All rights reserved.</p>
      </footer>
    </>
  );
}