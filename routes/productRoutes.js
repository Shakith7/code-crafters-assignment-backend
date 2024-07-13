const express = require('express');
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
