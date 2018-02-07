const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
// const passport = require('passport');

/* GET auth pages. */
router.get('/signup', authController.signup);
router.post('/signup', authController.doSignup);

router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/profile', usersController.profile);

// router.get('/logout', authController.logout);

module.exports = router;
