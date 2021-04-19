module.exports = class Conversation {
    constructor(id, messages, users) {
        this.id = id;
        this.messages = messages;
        this.users = users;
    }
};