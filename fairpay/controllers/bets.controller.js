// const mongoose = require('mongoose');
// const Bet = require('../models/bet.model');

module.exports.findBets = (req, res) => {
    res.render('bets/bets');
};

module.exports.createBet = (req, res) => {
    res.render('bets/create-bet');
};
