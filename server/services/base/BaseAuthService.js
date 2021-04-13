
module.exports = class BaseAuthService {
    constructor() {}

    async hashPlainPassword(password) {
        throw Error("Not Implemented");
    }

    async verifyPassword(password, hash) {
        throw Error("Not Implemented");
    }

    async generateToken() {
        throw Error("Not Implemented");
    }
}