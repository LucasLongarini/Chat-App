const express = require("express");
const UserController = require('../controllers/userController');
const Auth = require('./middleware/authenticate');

const userRouter = (dependencies) => {
    const router = express.Router();

    const controller = UserController(dependencies);

    router.post("/signup", controller.signup);

    router.post("/login", controller.login);

    return router;
};



module.exports = userRouter;
