module.exports = class User {
    constructor(id = undefined, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
};