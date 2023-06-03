const mongoose = require('mongoose');
const db = require('../config/connect')

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    googleId:String
});

const User = mongoose.model("user", userSchema);

module.exports = User;