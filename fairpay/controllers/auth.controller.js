const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const _ = require('lodash');

module.exports.signup = (req, res) => {
    res.render('auth/signup', {
        flash: req.flash()
    });
};

module.exports.doSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password || !username) {
        req.flash('info', 'Something went wrong!');
        res.render('auth/signup', {
            user: {email : email},
            flash: req.flash(),
            error: {
                email    : email   ? '' : 'Email is required',
                password: password ? '' : 'Password is required',
                username: username ? '' : 'Username is required'
            }
        });
    }
    User.findOne({email: req.body.email})
        .then(user => {
            if (user != null) {
                req.flash('info', 'Something went wrong!');
                res.render('auth/signup', {
                    user: user,
                    flash: req.flash(),
                    error: {email: 'Username already exists'}
                });
            } else {
                var body = _.pick(req.body, ['username', 'password', 'email']);
                user = new User(body);
                user.save()
                    .then(() => {
                        req.flash('info', 'Successfully sign up, now you can login!');
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
    res.render('auth/login', {
        flash: req.flash(),
        error: ''
    });
};

module.exports.doLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        req.flash('info', 'Something went wrong!');
        res.render('auth/login', {
            user: {email : email},
            flash: req.flash(),
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
                req.flash('info', 'Something went wrong!');
                res.render('auth/login', {
                    error: validation,
                    user: {email : email},
                    flash: req.flash(),
                });
            } else {
                req.login(user, (error) => {
                    if (error) {
                        next(error);
                    } else {
                        req.session.user = user;
                        res.redirect('/profile');
                    }
                });
            }
        })(req, res, next);
    }
};

module.exports.loginWithProviderCallback = (req, res, next) => {
    passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
        if (error) {
            next(error);
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
};

module.exports.logout = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            req.logout();
            res.redirect('/login');
        }
    });
};
