module.exports = class Message {
    constructor(id, toUser, fromUser, timestamp) {
        this.id = id;
        this.toUser = toUser;
        this.fromUser = fromUser;
        this.timestamp = timestamp
    }
};