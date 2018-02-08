const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const _ = require('lodash');

module.exports.signup = (req, res) => {
    res.render('auth/signup');
};

module.exports.doSignup = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user != null) {
                res.render('auth/signup', {
                    user: user,
                    error: {email: 'Username already exists'}
                });
            } else {
                var body = _.pick(req.body, ['username', 'password', 'email']);
                user = new User(body);
                user.save()
                    .then(() => {
                        // req.flash('info', 'Successfully sign up, now you can login!');
                        res.redirect('/login');
                    }).catch(error => {
                        if (error instanceof mongoose.Error.ValidationError) {
                            res.render('auth/signup', {
                                user: user,
                                error: error.errors
                            });
                        } else {
                            next(error);
                        }
                    });
            }
        }).catch(error => next(error));
};

module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.doLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email    || !password) {
        res.render('auth/login', {
            user: {email : email},
            error: {
                email    : email   ? '' : 'Email is required',
                password: password ? '' : 'Password is required'
            }
        });
    } else {
        passport.authenticate('local-auth', (error, user, validation) => {
            if (error) {
                next(error);
            } else if (!user) {
                res.render('auth/login', {error: validation});
            } else {
                req.login(user, (error) => {
                    if (error) {
                        next(error);
                    } else {
                        res.redirect('/profile');
                    }
                });
            }
        })(req, res, next);
    }
};

// module.exports.login = (req, res, next) => {
//     res.render('auth/login', {
//         flash: req.flash()
//     });
// }
