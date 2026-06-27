const { body, param } = require('express-validator');

const updateUserRules = [
    param('id')
        .isMongoId().withMessage('Invalid user ID format'),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),

    body('age')
        .optional()
        .isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
];

const mongoIdRules = [
    param('id')
        .isMongoId().withMessage('Invalid user ID format'),
];

module.exports = { updateUserRules, mongoIdRules };