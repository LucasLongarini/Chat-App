const BaseRepository = require('./BaseRepository');
const ConversationSchema = require('./schema/conversationSchema');
const Conversation = require('../../models/conversation');
const Message = require('../../models/message');
const mongoose = require('mongoose');

module.exports = class ConversationRepository extends BaseRepository {

    constructor(messageRepository, userRepository) {
        super(ConversationSchema);
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    async create(model) {

        try {
            let schemaToSave = this.toSchema(model);
            let savedSchema = await schemaToSave.save();
            savedSchema = await savedSchema.populate('users').execPopulate();
            return this.fromSchema(savedSchema);
        }
        catch (err) {
            return Promise.reject(err);
        }

    }

    async getAllConversations(userId) {
        try {
            const results = await ConversationSchema.find(
                { users: mongoose.Types.ObjectId(userId) },
                { 'messages': { '$slice': -1 } } // only take most recent message (we don't want to send them all)
            ).populate('users');

            if (!results) return []

            return results.map((schema) => this.fromSchema(schema));

        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    async findById(id) {
        try {
            const schemaObject = await this.schema.findById(id).populate('users');

            if (schemaObject === null) return undefined;

            return this.fromSchema(schemaObject)
        }

        catch (err) {
            return Promise.reject(err);
        }
    }

    async conversationExists(userIds) {
        try {
            const results = await ConversationSchema.findOne(
                { users: userIds?.map(id => mongoose.Types.ObjectId(id)) },
            );

            return results || false;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    async addMessage(conversationId, message) {
        try {
            const messageSchema = this.messageRepository.toSchema(message);

            const result = await ConversationSchema.findByIdAndUpdate(
                { _id: conversationId },
                { $push: { messages: messageSchema } },
                { new: true, useFindAndModify: false },
            ).slice("messages", -1);
            const newMessage = result?.messages[0];
            if (newMessage) return this.messageRepository.fromSchema(newMessage);
            return undefined;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    toSchema(model) {

        const users = model?.users?.map(user => {
            // dealing with a user object
            if (user?.id)
                return mongoose.Types.ObjectId(user.id);

            // dealing with just the userId
            else if (user)
                return mongoose.Types.ObjectId(user);

            return undefined;
        });

        return new ConversationSchema({
            _id: model.id ? mongoose.Types.ObjectId(model.id) : undefined,
            users: users,
            messages: model.messages?.map((message) => this.messageRepository.toSchema(message)),
        });
    }

    fromSchema(schema) {
        return new Conversation(schema.id.toString(),
            schema.messages?.map(messageSchema => this.messageRepository.fromSchema(messageSchema)),
            schema.users?.map(userSchema => userSchema.username ? this.userRepository.fromSchema(userSchema) : userSchema.toString()));
    }

}