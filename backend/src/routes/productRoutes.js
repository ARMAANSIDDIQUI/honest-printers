const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  applyDiscount,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:slug').get(getProductBySlug);
router.route('/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/discount').put(protect, admin, applyDiscount);

module.exports = router;
