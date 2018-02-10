const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const secure = require('../configs/passport.config');

router.get('/profile', secure.isAuthenticated, userController.profile);
router.get('/users', secure.checkRole('ADMIN'), userController.list);

module.exports = router;
