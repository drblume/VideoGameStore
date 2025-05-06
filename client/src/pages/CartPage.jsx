import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/cartContext';
import '../styles/styles.css';
import Layout from '../components/Layout';
import { checkoutCart } from '../api';

export default function CartPage() {
  const { cart, loading, error, removeFromCart, updateQuantity, getCartTotal, refreshCart } = useCart();

  useEffect(() => {
    // Refresh cart data when component mounts
    refreshCart();
    console.log("Cart contents:", cart);
  }, []);

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={refreshCart}>Try Again</button>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      await checkoutCart(userId);
      await refreshCart(userId); // update cart to reflect cleared state
      alert("Checkout successful!");
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed.");
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <h1>Your Cart</h1>

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                {item.image_url ? (
                  <img
                    src={item.image_url.startsWith('http') ? item.image_url : `/${item.image_url}`}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.png';
                    }}
                  />
                ) : (
                  <div className="placeholder-image">No image</div>
                )}
              </div>

              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="price">${item.price.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="quantity-btn"
                  >-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >+</button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Total: ${getCartTotal().toFixed(2)}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
}