const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product viewing routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/search', productController.searchProducts);

// Cart routes (stubbed for now)
router.post('/cart/add', productController.addToCart);
router.post('/cart/remove', productController.removeFromCart);
router.post('/checkout', productController.checkout);

// Admin routes
router.post('/admin/products', productController.addProduct);
router.put('/admin/products/:id', productController.editProduct);
router.post('/admin/products/bulk', productController.bulkUpload);

module.exports = router;
