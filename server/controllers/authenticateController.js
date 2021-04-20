const User = require('../models/user');
const createError = require("http-errors");

// Dependency injection so we can inject different services for things like testing
module.exports = (dependencies) => {

    const UserRepository = dependencies.UserRepository;
    const AuthService = dependencies.AuthService;

    const register = async (req, res, next) => {
        try {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;

            // Check if account already exists
            const user = await UserRepository.getByEmail(email);
            if (user)
                return next(createError(404, "This email already exists"));

            const hashedPass = await AuthService.hashPlainPassword(password);
            const newUser = await UserRepository.create(new User(undefined, username, email, hashedPass));
            const token = await AuthService.generateToken(newUser);
            res.cookie('authToken', token, { httpOnly: true });
            return res.status(201).json({ user: newUser });
        }
        catch (err) {
            next(createError(500, err.args));
        }
    }

    const login = async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user = await UserRepository.getByEmail(email, true);
            if (!user || !user?.password)
                return next(createError(404, "This email does not exist"));

            const correctPassword = await AuthService.verifyPassword(password, user.password);

            if (!correctPassword)
                return next(createError(401, "Incorrect password"));

            const token = await AuthService.generateToken(user);
            res.cookie('authToken', token, { httpOnly: true });
            user.password = undefined; // remove password before sending
            return res.status(200).json({ user: user });
        }
        catch (err) {
            next(createError(500, err.args));
        }
    }

    return {
        register,
        login,
    }
}