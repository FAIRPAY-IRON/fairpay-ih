const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
// const secure = require('../configs/passport.config');

// router.get('/profile', secure.isAuthenticated, userController.profile);
// router.get('/users', secure.checkRole('ADMIN'), userController.list);

router.get('/profile', usersController.profile);

router.get('/edit', usersController.edit);
router.post('/edit', usersController.doEdit);

module.exports = router;
