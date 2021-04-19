const mongoose = require('mongoose');
const messageSchema = require('./messageSchema').schema;

const ConversationSchema = mongoose.Schema({
    messages: {
        type: [messageSchema]
    },
    users: {
        type: [{
            _id: { type: mongoose.ObjectId }
        }],
        index: true
    }
});

module.exports = mongoose.model('Conversation', ConversationSchema, "Conversations");
module.exports.schema = ConversationSchema;