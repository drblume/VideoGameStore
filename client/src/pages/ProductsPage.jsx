import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { getAllProducts, searchProducts } from '../api';
import '../styles/styles.css';
import axios from 'axios';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllProducts = async () => {
    const response = await axios.get('/api/products'); // Or full URL
    return response.data;
  };
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const data = await searchProducts({ name: searchTerm });
      setProducts(data);
    } catch (err) {
      setError('Error searching products. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {loading && <div className="loading">Loading products...</div>}
      {error && <div className="error">{error}</div>}

      <section className="product-list">
        {!loading && products.length === 0 ? (
          <p>No products found. Try a different search term.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </section>
    </Layout>
  );
}