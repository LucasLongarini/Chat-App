const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    password: String,
    email: {
        type: String,
        unique: true
    },
    username: String,
});

module.exports = mongoose.model('User', UserSchema, "Users");