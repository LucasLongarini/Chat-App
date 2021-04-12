const BaseAuthService = require('./base/BaseAuthService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

module.exports = class AuthService extends BaseAuthService {
    constructor() {
        super();
    }

    async hashPlainPassword(password) {
        return await bcrypt.hash(password, saltRounds);
    }

    async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    async generateToken(user) {
        return new Promise((resolve, reject) => {
            jwt.sign({
                user: user
            }, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
                if (err)
                    reject(err);
                else
                    resolve(token);
            });
        });
    }
}