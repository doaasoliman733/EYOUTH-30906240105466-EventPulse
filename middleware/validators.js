const { body, param } = require('express-validator');

exports.registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

exports.loginValidation = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.createEventValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').isMongoId().withMessage('Category must be a valid ID'),
  body('date').isISO8601().toDate().withMessage('Date must be a valid date'),
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive number'),
];

exports.updateEventValidation = [
  param('id').isMongoId().withMessage('Event id must be a valid ID'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('category')
    .optional()
    .isMongoId()
    .withMessage('Category must be a valid ID'),
  body('date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Date must be a valid date'),
  body('capacity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive number'),
];

exports.registerForEventValidation = [
  body('event').isMongoId().withMessage('event must be a valid event ID'),
];