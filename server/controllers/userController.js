const User = require('../models/user');

// Dependency injection so we can inject different services for things like testing
module.exports = (dependencies) => {

    const UserRepository = dependencies.UserRepository;
    const AuthService = dependencies.AuthService;

    const signup = async (req, res, next) => {
        try {
            const hashedPass = await AuthService.hashPlainPassword("pass123");
            const newUser = await UserRepository.create(new User(undefined, "username", "bob@email.com", hashedPass));
            const token = await AuthService.generateToken(newUser);
            res.cookie('authToken', token, { httpOnly: true });

            return res.status(201).json({ User: newUser });
        }
        catch (err) {
            next(err.args);
        }
    }

    const login = async (req, res, next) => {
        try {
            const user = await UserRepository.getByEmail("bob@email.com");
            console.log(user);
            if (!user || !user?.password)
                return res.sendStatus(404);
            
            const correctPassword = await AuthService.verifyPassword("pass123", user.password);

            if (!correctPassword)
                return res.sendStatus(401);
            
            const token = await AuthService.generateToken(user);
            res.cookie('authToken', token, { httpOnly: true });
            return res.status(200).json({ User: user });
        }
        catch (err) {
            next(err.args);
        }
    }

    return {
        signup,
        login,
    }
}