const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/auth/users', userController.createUser);
router.post('/auth/login', userController.createUserLogin);
router.get('/profile', authenticateToken, userController.getUserById);

module.exports = router;
