// const mongoose = require('mongoose');
// const User = require('../models/user.model');
// const passport = require('passport');

module.exports.signup = (req, res, next) => {
    res.render('auth/signup');
}

module.exports.login = (req, res, next) => {
    res.render('auth/login');
}

// module.exports.login = (req, res, next) => {
//     res.render('auth/login', {
//         flash: req.flash()
//     });
// }
