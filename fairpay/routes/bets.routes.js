const express = require('express');
const router = express.Router();
const betsController = require('../controllers/bets.controller');

router.get('/findbets', betsController.findbets);

module.exports = router;
