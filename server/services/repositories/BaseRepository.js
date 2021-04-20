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

    async findById(id) {
        try {
            const schemaObject = await this.schema.findById(id);
            
            if (schemaObject === null) return undefined;

            return this.fromSchema(schemaObject)
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