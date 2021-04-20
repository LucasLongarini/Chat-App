const BaseRepository = require('./BaseRepository');
const MessageSchema = require('./schema/messageSchema');
const Message = require('../../models/message');
const mongoose = require('mongoose');

module.exports = class MessageRepository extends BaseRepository {

    constructor() {
        super(MessageSchema);
    }

    toSchema(model) {
        return new MessageSchema({
            _id: model.id ? mongoose.Types.ObjectId(model.id) : undefined,
            toUserId: model.toUserId ? mongoose.Types.ObjectId(model.toUserId) : undefined,
            fromUserId: model.fromUserId ? mongoose.Types.ObjectId(model.fromUserId) : undefined,
            content: model.content
        });
    }

    fromSchema(schema) {
        return new Message(schema.id.toString(), schema.toUserId, schema.fromUserId, schema.content, schema.sent);
    }

}