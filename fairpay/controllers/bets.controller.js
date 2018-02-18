const mongoose = require('mongoose');
const Bet = require('../models/bet.model');
var request = require('request');

//*******************importing API's data*******************//

var teamsObj = {};
var eventsObj = {};

function getTeamsData() {
    var teamsURL = 'https://apifootball.com/api/' +
        '?action=get_standings&league_id=376' +
        '&APIkey=6f52ff77f08b498da362e26d757713878c916dffec905f10e2bcb6cb40fb454d';

    request({
        url: teamsURL,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            teamsObj = body;
        }
    });
}

function getEventsData() {
    var eventsURL = 'https://apifootball.com/api/' +
        '?action=get_events&from=2016-10-30&to=2016-11-01' +
        '&APIkey=6f52ff77f08b498da362e26d757713878c916dffec905f10e2bcb6cb40fb454d';

    request({
        url: eventsURL,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            eventsObj = body;
        }
    });
}

getTeamsData();
getEventsData();

//*******************bets methods*******************//

module.exports.findBets = (req, res) => {
    Bet.find()
        .then(bets => {
            res.render('bets/find-bets', {bets});
        }).catch(() => {
            res.render('bets/find-bets');
        });
};

module.exports.createBet = (req, res) => {
    res.render('bets/create-bet', {eventsObj});
};

module.exports.showBet = (req, res) => {
    res.render('bets/bet', {teamsObj, eventsObj});
};

module.exports.saveBet = (req, res, next) => {

    const betname = req.body.betname.value;
    const description = req.body.description;
    const money = req.body.money;
    const userId = req.user._id;
    const location = {
     type: 'Point',
     coordinates: [req.body.location.split(',')[0], req.body.location.split(',')[1]]
 };

    if (!description || !money || !betname) {
        req.flash('info', 'Something went wrong!');
        res.redirect('bets/create-bet', {
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

module.exports.odds = (req, res) => {
    res.render('bets/odds');
};
