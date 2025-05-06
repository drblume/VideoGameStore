import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

export default function ProductCard({ product }) {
  return (
    <div className="product-item">
      <img
        src={product.image_url || '/images/placeholder.jpg'}
        alt={product.name}
        className="product-image"
      />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Description: {product.description}</p>
        <p>Category: {product.category_id}</p>
        <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
        <p>Condition: {product.condition || 'New'}</p>
        <Link to={`/products/${product.id}`}>View Details</Link>
      </div>
    </div>
  );
}