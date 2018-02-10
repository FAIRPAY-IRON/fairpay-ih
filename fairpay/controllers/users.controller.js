// const mongoose = require('mongoose');
// const User = require('../models/user.model');
const session = require('express-session');


module.exports.profile = (req, res) => {
    res.render('users/profile', {user: req.session.user});
};

// module.exports.list = (req, res, next) => {
//     User.find({})
//         .then(users => {
//             res.render('user/list', {
//                 users: users
//             });
//         })
//         .catch(error => next(error));
// }
