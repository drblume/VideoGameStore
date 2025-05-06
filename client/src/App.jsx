import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import AdminPage from './pages/AdminPage';
import AdminProductsPage from './pages/AdminProductsPage';
import ProductEditPage from './pages/ProductEditPage';
import { CartProvider } from './contexts/cartContext';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="product/:id" element={<ProductDetailsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="admin/products" element={<AdminProductsPage />} />
            <Route path="admin/products/:id" element={<ProductEditPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;