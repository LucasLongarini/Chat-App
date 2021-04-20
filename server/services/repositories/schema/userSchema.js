const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    password: String,
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        index: true
    },
});

module.exports = mongoose.model('User', UserSchema, "Users");
module.exports.schema = UserSchema;