const express = require('express');
const router = express.Router();
const betsController = require('../controllers/bets.controller');

router.get('/findbets', betsController.findBets);

router.get('/createbet', betsController.createBet);

router.get('/bet', betsController.showBet);

module.exports = router;
