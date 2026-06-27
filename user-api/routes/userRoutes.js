const { Router } = require('express');
const controller = require('../controllers/userController');
const validate = require('../middleware/validate');
const { updateUserRules, mongoIdRules } = require('../middleware/validators/userValidator');

const router = Router();

router.get('/',      controller.getAllUsers);
router.get('/:id',   mongoIdRules,    validate, controller.getUserById);
router.post('/',     controller.createUser); // register handles its own validation
router.put('/:id',   updateUserRules, validate, controller.updateUser);
router.delete('/:id', mongoIdRules,  validate, controller.deleteUser);

module.exports = router;