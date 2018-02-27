const mongoose = require('mongoose');
const Bet = require('../models/bet.model');
const footballApi = require('../services/football-api.service');

module.exports.findBets = (req, res) => {
    Bet.find()
        .then(bets => {
            res.render('bets/find-bets', {bets});
        }).catch(() => {
            res.render('bets/find-bets');
        });
};

module.exports.createBet = (req, res) => {
    footballApi.getEventsData('date', (error, data) => {
        if (error) {
            next(error);
        } else {
            res.render('bets/create-bet', {
                eventsObj: data
            });
        }
    });
};

module.exports.showBet = (req, res) => {
    const identifier = req.params.id;
    Bet.find({id: identifier})
        .then(bet => {
            footballApi.getEventsData('date', (error, data) => {
                if (error) {
                    next(error);
                } else {
                    const betId = bet[0].id;
                    const event = data.find(e => e.match_id === betId);
                    res.render('bets/bet', {
                        bet: bet,
                        evnt: event,
                        user: req.user
                    });
                }
            });
        });
};

module.exports.saveBet = (req, res, next) => {
    const description = req.body.description;
    const money = req.body.money;

    if (!description || !money) {
        req.flash('info', 'Something went wrong!');
        res.redirect('bets/create-bet', {
            flash: req.flash(),
            error: {
                description: description   ? '' : 'Description is required',
                money: money ? '' : 'Money is required',
            }
        });
    } else {
        footballApi.getEventsData('date', (error, data) => {
            if (error) {
                next(error);
            } else {
                const userId = req.user._id;
                const betId = req.body.match;
                const location = req.body.location.split(',');

                const event = data.find(e => e.match_id === betId);
                const betname = `${event.match_hometeam_name} vs ${event.match_awayteam_name}`;
                const point = {
                    type: 'Point',
                    coordinates: [location[0], location[1]]
                };

                const bet = new Bet({
                    id: betId,
                    betname,
                    description,
                    money,
                    users: userId,
                    location: point
                });

                bet.save()
                    .then(() => {
                        res.render('bets/bet', {
                            bet: bet,
                            evnt: event,
                            user: req.user
                        });
                    })
                    .catch(error => {
                        if (error instanceof mongoose.Error.ValidationError) {
                            res.render('bets/create-bet', {
                                bet: bet,
                                error: error.errors
                            });
                        } else {
                            next(error);
                        }
                    });
            }
        });
    }
};

module.exports.odds = (req, res) => {
    res.render('bets/odds');
};
