import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/cartContext';

// Import all pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import AdminPage from './pages/AdminPage';
import AdminProductsPage from './pages/AdminProductsPage';
import ProductEditPage from './pages/ProductEditPage';
import BulkUploadPage from './pages/BulkUploadPage';

// Import CSS
import './App.css';

function App() {
  return (
      <CartProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-products" element={<AdminProductsPage />} />
          <Route path="/product-edit/:id" element={<ProductEditPage />} />
          <Route path="/admin" element={<BulkUploadPage />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

// Simple NotFound component
function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Return to Home</a>
    </div>
  );
}

export default App;
