import React from 'react';
import '../styles/styles.css';

export default function HomePage() {
  return (
    <>
      <header>
        <h1>Cartridge Classics</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/signin">Sign In</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </nav>
      </header>

      <div className="image-row">
        <img src="../images/gameCube.jpg" alt="GameCube" className="hero uniform" />
        <img src="/images/GBAblue.jpg" alt="GameBoy" className="hero uniform" />
        <img src="/images/NES.jpg" alt="NES" className="hero uniform" />
        <img src="/images/PS1.jpg" alt="PlayStation" className="hero uniform" />
        <img src="/images/N64.jpg" alt="Nintendo 64" className="hero uniform" />
      </div>

      <section className="search">
        <input type="text" placeholder="Search for products..." />
        <button>Go</button>
      </section>

      <section className="splash">
        <h2>Power Up Your Nostalgia!</h2>
        <p>Create an account and find the best deals on classic games to add to your collection!</p>
        <a href="/products" className="shop-now">Shop Now</a>
      </section>

      <footer>
        <p>&copy; 2025 Cartridge Classics. All rights reserved.</p>
      </footer>
    </>
  );
}
