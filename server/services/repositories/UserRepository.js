const BaseRepository = require('./BaseRepository');
const UserSchema = require('./schema/userSchema');
const User = require('../../models/user');
const mongoose = require('mongoose');

module.exports = class UserRepository extends BaseRepository {

    constructor() {
        super(UserSchema);
    }

    async getByEmail(email) {
        try {
            let user = await UserSchema.findOne({ email: email });

            if (user === null) return undefined;

            else {
                return this.fromSchema(user);
            }
        }
        catch (err) {
            return Promise.reject(err);
        }

    }

    async getByUsername(username) {
        try {
            let users = await UserSchema.find({ username: { "$regex": username, "$options": "i" } });

            if (users === null || users?.length === 0) return undefined;

            else {
                return users.map((user) => {
                    let userModel = this.fromSchema(user);
                    delete userModel['password'];
                    return userModel;
                });
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    toSchema(model) {
        let userSchema = new UserSchema({
            _id: model.id ? mongoose.Types.ObjectId(model.id) : undefined,
            email: model.email.toLowerCase(),
            username: model.username,
            password: model.password,
        });

        return userSchema;
    }

    fromSchema(schema) {
        return new User(schema.id.toString(), schema.username, schema.email.toLowerCase(), schema.password);
    }

}