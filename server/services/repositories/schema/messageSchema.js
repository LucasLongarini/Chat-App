const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    to: {
        type: mongoose.ObjectId,
    },
    from: {
        type: mongoose.ObjectId,
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Message', MessageSchema, "Messages");
module.exports.schema = MessageSchema;