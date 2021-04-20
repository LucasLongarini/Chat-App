const Conversation = require('../models/conversation');
const Message = require('../models/message');
const createError = require("http-errors");

// Dependency injection so we can inject different services for things like testing
module.exports = (dependencies) => {

    const ConversationRepository = dependencies.ConversationRepository;
    const UserRepository = dependencies.UserRepository;


    // get all conversations for a user
    const getAll = async (req, res, next) => {
        try {
            const userId = req.authData.user.id;
            const conversations = await ConversationRepository.getAllConversations(userId);
            console.log(conversations);

            // clean up json
            let cleanedConversations = conversations?.map((conversation) => {
                return {
                    id: conversation.id,
                    latestMessage: conversation.messages[0],
                    users: conversation.users.filter(i => i.id !== userId) //send a list of users that aren't yourself,
                }
            });
            res.status(200).json({ conversations: cleanedConversations });
        }
        catch (err) {
            next(createError(500, err));
        }

    }

    const getMessages = async (req, res, next) => {
        try {
            const conversationId = req.params.id;
            const userId = req.authData?.user?.id;
            const conversation = await ConversationRepository.findById(conversationId);

            // not found
            if (!conversation)
                return next(createError(404));

            // this user does not belong to the conversation
            if (!conversation.users.find(i => i.id === userId))
                return next(createError(401));

            const messages = conversation.messages?.map((message) => {
                return {
                    id: message.id,
                    content: message.content,
                    sent: message.sent,
                    fromUserId: message.fromUserId
                }
            });

            res.status(200).json({ messages: messages });
        }
        catch (err) {
            console.log(err);
            next(createError(500, err));
        }
    }

    const create = async (req, res, next) => {
        try {
            let creatingUser = req.authData.user.id;
            let requestedUser = req.query.userId;

            // can't create a conversation with yourself
            if (creatingUser === requestedUser)
                return next(createError(400));

            // validate user exists
            if (!await UserRepository.findById(requestedUser))
                return next(createError(404));

            //check if conversation already exists
            const exists = await ConversationRepository.conversationExists(creatingUser, requestedUser);
            if (exists)
                return next(createError(409, "Conversation already exists"));

            const newConversation = new Conversation(undefined, undefined, [creatingUser, requestedUser]);
            const savedConversation = await ConversationRepository.create(newConversation);

            if (!savedConversation)
                return res.sendStatus(500);

            // for testing - add a new message
            // await ConversationRepository.addMessage(savedConversation.id, new Message(undefined, requestedUser, creatingUser, "Hello World"));
            // await ConversationRepository.addMessage(savedConversation.id, new Message(undefined, creatingUser, requestedUser, "Hey whats up"));
            // await ConversationRepository.addMessage(savedConversation.id, new Message(undefined, requestedUser, creatingUser, "Not much, you?"));

            return res.status(201).json(savedConversation);
        }
        catch (err) {
            console.log(err);
            next(createError(500, err.args));
        }

    }

    return {
        getAll,
        getMessages,
        create,
    }
}