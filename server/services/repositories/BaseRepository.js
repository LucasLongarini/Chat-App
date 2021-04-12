module.exports = class BaseRepository {
    constructor(schema) {
        this.schema = schema;
    }

    async create(model) {

        try {
            let schemaToSave = this.toSchema(model);
            let savedSchema = await schemaToSave.save();
            return this.fromSchema(savedSchema);
        }
        catch (err) {
            return Promise.reject(err);
        }

    } 

    toSchema(model) {
        throw Error("Not Implemented");
    }

    fromSchema(schema) {
        throw Error("Not Implemented");
    }
}