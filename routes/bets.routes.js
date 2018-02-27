const express = require('express');
const router = express.Router();
const betsController = require('../controllers/bets.controller');

router.get('/findbets', betsController.findBets);

router.get('/createbet', betsController.createBet);

router.post('/createbet', betsController.saveBet);

router.get('/bet/:id', betsController.showBet);

router.get('/odds', betsController.odds);

module.exports = router;
