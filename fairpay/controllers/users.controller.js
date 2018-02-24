// const mongoose = require('mongoose');
const User = require('../models/user.model');
const Bet = require('../models/bet.model');
// const session = require('express-session');


module.exports.profile = (req, res) => {
    Bet.find({users: req.user._id})
        .then(bets => {
            res.render('users/profile', {
                user: res.locals.user,
                flash: req.flash(),
                bets: bets || [],
            });
        })
        .catch(error => {
            console.log(error);
        });

};

module.exports.edit = (req, res) => {
    res.render('users/edit', {
        user: res.locals.user
    });
};

module.exports.doEdit = (req, res) => {
    const {
        username,
        picture
    } = req.body;
    if (!picture || !username) {
        req.flash('info', 'Something went wrong!');
        res.render('auth/signup', {
            user: {
                picture: picture
            },
            flash: req.flash(),
            error: {
                picture: picture ? '' : 'Image URL is required',
                username: username ? '' : 'Username is required'
            }
        });
    } else {
        const {_id} = req.user;
        const {username, picture, money} = req.body;
        User.findOne({_id})
            .then(user => {
                user.username = username;
                user.picture = picture;
                user.money = parseInt(money) + parseInt(user.money);
                user.save()
                    .then(() => {
                        req.flash('info', 'Successfully modified!');
                        res.redirect('/profile');
                    })
                    .catch(error => {
                        if (error instanceof mongoose.Error.ValidationError) {
                            res.render('users/edit', {
                                user: user,
                                error: error.errors
                            });
                        } else {
                            next(error);
                        }
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
};
