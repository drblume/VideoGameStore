// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  getCart,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartItem
} from '../api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get userId from localStorage
  const getUserId = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.warn("⚠️ User ID not found in localStorage");
      return null;
    }
    return userId;
  };

  const fetchCart = async (userId) => {
    try {
      setLoading(true);
      const cartData = await getCart(userId); // API call using userId
      setCart(cartData);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart data');
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchCart(userId);
    }
  }, []);  

  const addToCart = async (productId, quantity = 1) => {
    try {
      const userId = getUserId();
      if (!userId) throw new Error("User not logged in");

      await apiAddToCart({ userId, productId, quantity });
      fetchCart();
      return true;
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart');
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const userId = getUserId();
      if (!userId) throw new Error("User not logged in");

      await updateCartItem(productId, quantity);
      fetchCart();
      return true;
    } catch (err) {
      console.error('Error updating cart item:', err);
      setError('Failed to update cart');
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const userId = getUserId();
      if (!userId) throw new Error("User not logged in");

      await apiRemoveFromCart(productId);
      fetchCart();
      return true;
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove item from cart');
      return false;
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      refreshCart: fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
