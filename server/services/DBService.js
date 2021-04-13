const BaseDBService = require("./base/BaseDBService");
const mongoose = require('mongoose');

module.exports = class DBService extends BaseDBService {
    constructor() {
        super();
    }

    init() {
        mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        const db = mongoose.connection;

        db.on("error", console.error.bind(console, "connection error:"));

        db.once("open", () => console.log("DB Connection Successful"));
        return true;
    }
}