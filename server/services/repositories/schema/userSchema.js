const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    password: String,
    email: String,
    username: String,
});

module.exports = mongoose.model('User', UserSchema, "Users");