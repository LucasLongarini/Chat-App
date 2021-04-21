const createError = require("http-errors");

// Dependency injection so we can inject different services for things like testing
module.exports = (dependencies) => {

    const UserRepository = dependencies.UserRepository;

    const search = async (req, res, next) => {
        try {
            const username = req.query.username;

            const users = await UserRepository.getByUsername(username);

            return res.status(200).json({ users: users });
        }
        catch (err) {
            next(createError(500, err.args));
        }
    }

    return {
        search
    }
}