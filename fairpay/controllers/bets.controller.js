const mongoose = require('mongoose');
const Bet = require('../models/bet.model');

module.exports.findBets = (req, res) => {
    Bet.find()
        .then(bets => {
            res.render('bets/find-bets', {bets});
        }).catch(() => {
            res.render('bets/find-bets');
        });
};

module.exports.createBet = (req, res) => {
    res.render('bets/create-bet');
};

module.exports.showBet = (req, res) => {
    res.render('bets/bet');
};

module.exports.saveBet = (req, res, next) => {

    const betname = req.body.betname;
    const description = req.body.description;
    const money = req.body.money;
    const userId = req.user._id;
    const location = {
     type: 'Point',
     coordinates: [req.body.location.split(',')[0], req.body.location.split(',')[1]]
 };

    if (!description || !money || !betname) {
        req.flash('info', 'Something went wrong!');
        res.render('auth/createbet', {
            flash: req.flash(),
            error: {
                description    : description   ? '' : 'Description is required',
                money: money ? '' : 'Money is required',
                betname: betname ? '' : 'Betname is required',
            }
        });
    }

    var newBet = {
        betname,
        description,
        money,
        users: userId,
        location
    };

    bet = new Bet(newBet);

    bet.save()
        .then(bet => {
            res.render('bets/bet', {bet});
        }).catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('bets/create-bet', {
                    bet: bet,
                    error: error.errors
                });
            } else {
                next(error);
            }
        });
};
