import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, editProduct } from '../api';
import '../styles/styles.css';

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category_id: '',
    image_url: '',
    price: '',
    condition: ''
  });

  useEffect(() => {
    // Fetch the product details when the component mounts
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProduct(id, product);
      setMessage('Product updated successfully!');
      // Redirect back to admin products page after a brief delay
      setTimeout(() => {
        navigate('/admin-products');
      }, 1500);
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error('Error updating product:', err);
    }
  };

  return (
    <>
      <header>
        <h1>Cartridge Classics Admin Panel</h1>
        <nav>
          <ul>
            <li><Link to="/admin">Bulk Upload</Link></li>
            <li><Link to="/admin-products">Product Listing</Link></li>
            <li><Link to="/signin">Sign Out</Link></li>
            <li><Link to="/">Back to Home Page</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Edit Product</h2>
        
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading product details...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
            
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            ></textarea>
            
            <label htmlFor="category_id">Category:</label>
            <input
              type="text"
              id="category_id"
              name="category_id"
              value={product.category_id}
              onChange={handleInputChange}
              required
            />
            
            <label htmlFor="image_url">Image Path:</label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={product.image_url}
              onChange={handleInputChange}
              required
            />
            
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              value={product.price}
              onChange={handleInputChange}
              required
            />
            
            <label htmlFor="condition">Condition:</label>
            <input
              type="text"
              id="condition"
              name="condition"
              value={product.condition || ''}
              onChange={handleInputChange}
              required
            />
            
            <div className="form-buttons">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => navigate('/admin-products')}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>

      <footer>
        <p>&copy; 2025 Cartridge Classics. All rights reserved.</p>
      </footer>
    </>
  );
}