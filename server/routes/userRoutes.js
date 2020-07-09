const router = require('express').Router();
const { UserController } = require('../controllers');
const { Auth } = require('../middlewares');

// Methods
router.post(`/register`, UserController.register);
router.post(`/login`, UserController.login);
router.get(`/user`, Auth.authenticate, UserController.getUser);
router.post(`/checkUsername`, UserController.checkUsername);

module.exports = router;