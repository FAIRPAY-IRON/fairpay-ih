// const mongoose = require('mongoose');
// const Bet = require('../models/bet.model');

module.exports.findBets = (req, res) => {
    res.render('bets/find-bets');
};

module.exports.createBet = (req, res) => {
    res.render('bets/create-bet');
};

module.exports.showBet = (req, res) => {
    res.render('bets/bet');
};

// module.exports.saveBet = (req, res) => {
//     const betname = req.body.betname;
//     const description = req.body.description;
//     const money = req.body.money;
//     const userId = session._id;
//
//     // const location = req.body.location;
//
//     if (!description || !money || !betname) {
//         req.flash('info', 'Something went wrong!');
//         res.render('auth/createbet', {
//             flash: req.flash(),
//             error: {
//                 description    : description   ? '' : 'Description is required',
//                 money: money ? '' : 'Money is required',
//                 betname: betname ? '' : 'Betname is required',
//             }
//         });
//     }
//
//     var newBet = {
//         betname,
//         description,
//         money,
//         users: userId
//     };
//
//     bet = new Bet(newBet);
//     bet.save()
//         .then(() => {
//             res.render('bets/bet');
//         }).catch(error => {
//             if (error instanceof mongoose.Error.ValidationError) {
//                 res.render('auth/signup', {
//                     bet: bet,
//                     error: error.errors
//                 });
//             } else {
//                 next(error);
//             }
//         });
// };
