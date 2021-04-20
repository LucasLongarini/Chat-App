const mongoose = require('mongoose');
const messageSchema = require('./messageSchema').schema;

const ConversationSchema = mongoose.Schema({
    messages: {
        type: [messageSchema]
    },
    users: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
        index: true
    }
});

module.exports = mongoose.model('Conversation', ConversationSchema, "Conversations");
module.exports.schema = ConversationSchema;