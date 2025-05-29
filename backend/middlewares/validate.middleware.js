// This function takes a validation schema and returns a middleware function
const validateBody = (schema) => (req, res, next) => {
  // Validate the request body using the provided schema
  // abortEarly: false means it will check for all errors, not stop at the first
  const { error } = schema.validate(req.body, { abortEarly: false });
  
  // If there are validation errors
  if (error) {
    // Extract all error messages from the validation result
    const errors = error.details.map((detail) => detail.message);
    // Send a 422 Unprocessable Entity response with the errors
    return res.status(422).json({ errors });
  }
  
  // If no errors, call next middleware or route handler
  next();
};

// Export the validateBody function for use in routes
module.exports = {
  validateBody,
};
