const DBService = require('../services/DBService');
const UserRepository = require('../services/repositories/UserRepository');
const MessageRepository = require('../services/repositories/MessageRepository');
const ConversationRepository = require('../services/repositories/ConversationRepository');
const AuthService = require('../services/AuthService');

let messageRepository = new MessageRepository()
let userRepository = new UserRepository();
module.exports.DBService = new DBService();
module.exports.UserRepository = userRepository;
module.exports.ConversationRepository = new ConversationRepository(messageRepository, userRepository);
module.exports.MessageRepository = messageRepository;
module.exports.AuthService = new AuthService();