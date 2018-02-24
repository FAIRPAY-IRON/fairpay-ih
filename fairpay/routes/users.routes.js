const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const checkoutController = require('../controllers/checkout.controller');

// const secure = require('../configs/passport.config');

router.get('/profile', usersController.profile);

router.get('/edit', usersController.edit);
router.post('/edit', usersController.doEdit);

router.get('/addMoney', checkoutController.checkout);

router.post('/pay', checkoutController.pay);

router.get('/succes', checkoutController.succes);
router.get('/cancel', checkoutController.cancel);

module.exports = router;
