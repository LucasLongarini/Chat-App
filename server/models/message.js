module.exports = class Message {
    constructor(id, fromUserId, content, sent) {
        this.id = id;
        this.fromUserId = fromUserId;
        this.content = content
        this.sent = sent
    }
};