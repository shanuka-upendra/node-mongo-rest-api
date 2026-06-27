const { Router } = require('express');
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const { registerRules, loginRules } = require('../middleware/validators/authValidator');

const router = Router();

//             rules run first → validate checks errors → controller only if clean
router.post('/register', registerRules, validate, authController.register);
router.post('/login',    loginRules,    validate, authController.login);

module.exports = router;