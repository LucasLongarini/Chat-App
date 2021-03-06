const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sent: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema, "Messages");
module.exports.schema = MessageSchema;