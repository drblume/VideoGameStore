// Fixed productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Order matters for routes
// Public routes
router.get('/search', productController.searchProducts); 
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/', productController.addProduct);
router.put('/:id', productController.editProduct);
router.post('/bulkUpload', productController.bulkUpload);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
