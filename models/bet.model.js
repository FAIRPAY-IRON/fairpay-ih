const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
    id: {
        type: String
    },
    betname: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'Description required']
    },
    money: {
        type: Number,
        default: 0
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    location: {
        type: {type: String},
        coordinates: [Number]
    }
}, {timestamps: true});

betSchema.index({location: '2dsphere'});

const Bet = mongoose.model('Bet', betSchema);
module.exports = Bet;