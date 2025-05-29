const Joi = require('joi');

// Schema to validate signup data
// username: required, string, between 3 and 30 characters
// password: required, string, minimum 6 characters
const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

// Schema to validate login data
// username: required, string (no length restrictions here)
// password: required, string
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  signupSchema,
  loginSchema,
};
