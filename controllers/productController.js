const Product = require('../models/product');
const mongoose = require('mongoose');
// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { sku, name, description, units, unitType, price, category, image } = req.body;
  try {
    const product = new Product({
      sku,
      name,
      description,
      units,
      unitType,
      price,
      category,
      image,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    console.log(`Attempting to delete product with ID: ${req.params.id}`);
    console.log('MongoDB connection state:', mongoose.connection.readyState);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log(`Product with ID ${req.params.id} not found`);
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    console.log(`Product with ID ${req.params.id} removed`);
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(`Backend: Error deleting product with ID ${req.params.id}:`, error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: error.stack 
    });
  }
};


// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//
// Update the product
const updateProduct = async (req, res) => {
  const { sku, name, description, units, unitType, price, category, image } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.sku = sku;
      product.name = name;
      product.description = description;
      product.units = units;
      product.unitType = unitType;
      product.price = price;
      product.category = category;
      product.image = image;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
