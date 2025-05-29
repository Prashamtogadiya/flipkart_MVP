const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controllers');
const authenticateToken = require('../middlewares/auth.middleware');
const { productSchema } = require('../validations/product.validation'); // Joi schema for product validation
const { validateBody } = require('../middlewares/validate.middleware');

// Route to get all products, no login needed
router.get('/', productController.getAllProducts);

// Route to get a single product by its id, no login needed
router.get('/:id', productController.getProductById);

// Route to update a product by id
// User must be logged in, and request body must pass validation
router.put('/:id', authenticateToken, validateBody(productSchema), productController.updateProductById);

// Route to add a new product
// User must be logged in, and request body must pass validation
router.post('/', authenticateToken, validateBody(productSchema), productController.addNewProduct);

// Route to delete a product by id
// User must be logged in
router.delete('/:id', authenticateToken, productController.deleteProductById);

// Export the router to use in main app
module.exports = router;
