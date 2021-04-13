const express = require("express");
const UserController = require('../controllers/userController');
const { check } = require('express-validator');
const sanitize = require('./middleware/sanitize');

const userRouter = (dependencies) => {
    const router = express.Router();

    const controller = UserController(dependencies);

    router.post("/register", [
        check('email').isEmail().normalizeEmail(),
        check('password').trim().isLength({ min: 6 }),
        check('username').notEmpty().trim().escape(),
    ], sanitize, controller.register);

    router.post("/login", [
        check('email').isEmail().normalizeEmail(),
        check('password').trim().notEmpty(),
    ], sanitize, controller.login);

    return router;
};



module.exports = userRouter;
