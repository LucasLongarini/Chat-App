module.exports = class Message {
    constructor(id, toUserId, fromUserId, content, sent) {
        this.id = id;
        this.toUserId = toUserId;
        this.fromUserId = fromUserId;
        this.content = content
        this.sent = sent
    }
};