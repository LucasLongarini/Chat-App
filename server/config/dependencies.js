const DBService = require('../services/DBService');
const UserRepository = require('../services/repositories/UserRepository');
const AuthService = require('../services/AuthService');

module.exports.DBService = new DBService();
module.exports.UserRepository = new UserRepository();
module.exports.AuthService = new AuthService();