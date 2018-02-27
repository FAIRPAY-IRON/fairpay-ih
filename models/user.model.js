const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const ROLE_ADMIN = 'ADMIN';
const ROLE_GUEST = 'GUEST';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User needs a password']
    },
    email: {
        type: String,
        required: [true, 'User needs an email'],
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    social: {
        facebookId: String,
        googleId: String
    },
    money: {
        type: Number,
        default: 20
    },
    picture: {
        type: String,
        default: 'http://africa.aidforum.org/images/speakers/Blank_Speaker_Image_9.png'
      },
    bets: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bet'
    },
    role: {
        type: String,
        enum: [ROLE_GUEST, ROLE_ADMIN],
        default: ROLE_GUEST
    }
}, {timestamps: true});

userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    // if (user.isAdmin()) {
    //     user.role = 'ADMIN';
    // }

    bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
            bcrypt.hash(user.password, salt)
                .then(hash => {
                    user.password = hash;
                    next();
                });
        })
        .catch(error => next(error));
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// userSchema.methods.isAdmin = function() {
//     return this.username === FIRST_ADMIN || this.role === ROLE_ADMIN;
// }

const User = mongoose.model('User', userSchema);
module.exports = User;
