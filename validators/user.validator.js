const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    'string.empty': 'Name is required.',
    'any.required': 'Name is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(1).required().messages({
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.',
  }),
});

module.exports = { signupSchema, loginSchema };
