const express = require('express');
const router = express.Router();
const betsController = require('../controllers/bets.controller');

router.get('/findbets', betsController.findBets);

router.get('/createbet', betsController.createBet);

module.exports = router;
