const { body } = require('express-validator');

const registerRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/\d/).withMessage('Password must contain at least one number'),

    body('age')
        .optional()
        .isInt({ min: 1, max: 120 }).withMessage('Age must be a number between 1 and 120'),
];

const loginRules = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email'),

    body('password')
        .notEmpty().withMessage('Password is required'),
];

module.exports = { registerRules, loginRules };