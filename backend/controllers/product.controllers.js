// Importing the Product model
const Product = require("../models/productlist.model");

// Get all products from the database
exports.getAllProducts = async (req, res) => {
  try {
    // Find all products
    const products = await Product.find();
    // Send all products as JSON response
    res.json(products);
  } catch (err) {
    // If an error happens, send error message with status 500
    res.status(500).json({ error: err.message });
  }
};

// Get a single product by its ID
exports.getProductById = async (req, res) => {
  try {
    // Find product by ID from the request params
    const product = await Product.findById(req.params.id);
    // If product not found, send 404 response
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Send the found product as JSON
    res.json(product);
  } catch (err) {
    // If an error happens, send error message with status 500
    res.status(500).json({ error: err.message });
  }
};

// Add a new product to the database
exports.addNewProduct = async (req, res) => {
  try {
    // Create a new product using request body data
    const product = await Product(req.body);
    // Save the product to the database
    await product.save();
    // Send back the created product with status 201 (created)
    res.status(201).json(product);
  } catch (err) {
    // If an error happens, send error message with status 500
    res.status(500).json({ error: err.message });
  }
};

// Delete a product by its ID
exports.deleteProductById = async (req, res) => {
  try {
    // Find and delete the product by ID
    const product = await Product.findByIdAndDelete(req.params.id);
    // If product not found, send 404 response
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // If product not found, send 404
    }
    // Send deleted product as response
    res.status(200).json(product);
  } catch (err) {
    // If an error happens, send error message with status 500
    res.status(500).json({ error: err.message });
  }
};

// Update a product by its ID
exports.updateProductById = async (req, res) => {
  try {
    // Find product by ID and update it with data from request body
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated product
    );
    // If product not found, send 404 response
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" }); // 404 if product not found
    }
    // Send the updated product as response
    res.status(200).json(updateProduct)
  } catch (err) {
    // If an error happens, send error message with status 500
    res.status(500).json({ error: err.message });
  }
};

// Prefix search by product name or category
exports.searchProductsByPrefix = async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.json([]);
    // Case-insensitive prefix search on name or category
    const regex = new RegExp('^' + q, 'i');
    const products = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
