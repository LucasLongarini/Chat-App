const BaseDBService = require("./base/BaseDBService");

module.exports = class DBService extends BaseDBService {
    constructor() {
        super();
    }

    init() {
        return true;
    }
}