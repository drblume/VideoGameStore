import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import { getAllProducts, deleteProduct, addProduct } from '../api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state for adding new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category_id: '',
    image_url: '',
    price: '',
    condition: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
        setMessage('Product deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete product. Please try again.');
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      setMessage('Product added successfully!');
      // Reset form
      setNewProduct({
        name: '',
        description: '',
        category_id: '',
        image_url: '',
        price: '',
        condition: ''
      });
      // Refresh products list
      fetchProducts();
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error('Error adding product:', err);
    }
  };

  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

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
        <h2>Product Listing</h2>
        
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        
        <div className="search-bar">
          <input 
            type="text" 
            id="search" 
            placeholder="Search by product name or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="product-item">
                  <img 
                    src={product.image_url || '/images/placeholder.jpg'} 
                    alt={product.name}
                  />
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>Description: {product.description}</p>
                    <p>Category: {product.category_id}</p>
                    <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
                    <p>Condition: {product.condition || 'New'}</p>
                    <div className="admin-actions">
                      <button>
                        <Link to={`/product-edit/${product.id}`}>Edit</Link>
                      </button>
                      <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
        
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct}>
          <label htmlFor="name">Product Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={newProduct.name}
            onChange={handleInputChange}
            required 
          />
          
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            name="description" 
            value={newProduct.description}
            onChange={handleInputChange}
            required
          ></textarea>
          
          <label htmlFor="category_id">Category:</label>
          <input 
            type="text" 
            id="category_id" 
            name="category_id" 
            value={newProduct.category_id}
            onChange={handleInputChange}
            required 
          />
          
          <label htmlFor="image_url">Image Path:</label>
          <input 
            type="text" 
            id="image_url" 
            name="image_url" 
            value={newProduct.image_url}
            onChange={handleInputChange}
            required 
          />
          
          <label htmlFor="price">Price:</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            step="0.01" 
            value={newProduct.price}
            onChange={handleInputChange}
            required 
          />
          
          <label htmlFor="condition">Condition:</label>
          <input 
            type="text" 
            id="condition" 
            name="condition" 
            value={newProduct.condition}
            onChange={handleInputChange}
            required 
          />
          
          <button type="submit">Add Product</button>
        </form>
      </main>

      <footer>
        <p>&copy; 2025 Cartridge Classics. All rights reserved.</p>
      </footer>
    </>
  );
}