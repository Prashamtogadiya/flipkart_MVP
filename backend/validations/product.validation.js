const Joi = require('joi');

// Schema to validate product data
const productValidation = Joi.object({
  // Product name: required string between 2 and 100 characters
  name: Joi.string().min(2).max(100).required(),
  
  // Description: required string between 5 and 1000 characters
  description: Joi.string().min(5).max(1000).required(),
  
  // Price: required positive number with up to 2 decimal places
  price: Joi.number().positive().precision(2).required(),
  
  // imageUrl: required array with at least one item, each item must be a valid URL string
  imageUrl: Joi.array().items(Joi.string().uri()).min(1).required(),
  
  // Category: required string between 2 and 50 characters
  category: Joi.string().min(2).max(50).required()
});

module.exports = productValidation;
