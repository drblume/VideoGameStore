const productModel = require('../models/productModel');

// View all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const products = await productModel.searchProducts(req.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add product to cart (stub)
exports.addToCart = (req, res) => {
  res.json({ message: 'Added to cart' });
};

// Remove product from cart (stub)
exports.removeFromCart = (req, res) => {
  res.json({ message: 'Removed from cart' });
};

// Checkout (stub)
exports.checkout = (req, res) => {
  res.json({ message: 'Cart checked out' });
};

// Admin: Add product
exports.addProduct = async (req, res) => {
  try {
    const result = await productModel.addProduct(req.body);
    res.status(201).json({ message: 'Product added', id: result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Edit product
exports.editProduct = async (req, res) => {
  try {
    const result = await productModel.editProduct(req.params.id, req.body);
    res.json({ message: 'Product updated', changes: result.updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Bulk upload
exports.bulkUpload = async (req, res) => {
  try {
    const result = await productModel.bulkUpload(req.body.products);
    res.json({ message: 'Bulk upload successful', count: result.inserted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
