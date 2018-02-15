const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
    betname: {
        type: String,
        required: [true, 'Betname is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description required']
    },
    money: {
        type: Number,
        default: 0
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        type: {type: String},
        coordinates: [Number]
}, timestamps: true});

betSchema.index({location: '2dsphere'});

const Bet = mongoose.model('Bet', betSchema);
module.exports = Bet;
