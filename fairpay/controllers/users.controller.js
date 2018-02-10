const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.profile = (req, res, next) => {
    res.render('users/profile');
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
