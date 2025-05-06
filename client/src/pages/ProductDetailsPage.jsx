import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api';
import { useCart } from '../contexts/cartContext';
import '../styles/styles.css';
import Layout from '../components/Layout';

// Optional: If you have a Header or Nav component, import it
// import Header from '../components/Header';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product); // product should be the current product details
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="error">Product not found</div>;

  const imageUrl = product.image_url || product.imageUrl;

  return (
    <>
      <Layout>
        <div className="container">
          <h1>{product.name}</h1>
          <div className="product-details">
            <div className="product-image">
              {imageUrl ? (
                <img
                  src={imageUrl.startsWith('http') ? imageUrl : `/${imageUrl}`}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png';
                  }}
                />
              ) : (
                <div className="placeholder-image">
                  No Image Available
                </div>
              )}
            </div>

            <div className="product-info">
              <p className="price">Price: ${product.price?.toFixed(2)}</p>
              <p className="system">System: {product.category}</p>
              <p className="condition">Condition: {product.condition}</p>
              <p className="description">{product.description}</p>

              <button onClick={handleAddToCart}>Add to Cart</button>


              {addedToCart && (
                <div className="success-message">Successfully added to cart!</div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
