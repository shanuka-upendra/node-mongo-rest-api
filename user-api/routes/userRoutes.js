const { Router } = require('express');
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { updateUserRules, mongoIdRules } = require('../middleware/validators/userValidator');

const router = Router();

router.get('/', auth, controller.getAllUsers);
router.get('/:id', auth, mongoIdRules, validate, controller.getUserById);
router.post('/', auth, controller.createUser); // register handles its own validation
router.put('/:id', auth, updateUserRules, validate, controller.updateUser);
router.delete('/:id', auth, mongoIdRules, validate, controller.deleteUser);

module.exports = router;