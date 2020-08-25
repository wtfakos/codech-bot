const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    xp: {
        type: Number,
        required: true,
        default: 0,
    },
    level: {
        type: Number,
        required: true,
        default: 1,
    },
    warns: {
        type: Number,
        required: true,
        default: 0,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("user-profiles", UserSchema);