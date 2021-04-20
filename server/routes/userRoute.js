const express = require("express");
const UserController = require('../controllers/userController');
const { check, query } = require('express-validator');
const sanitize = require('./middleware/sanitize');
const authenticate = require('./middleware/authenticate');

const userRouter = (dependencies) => {
    const router = express.Router();

    const controller = UserController(dependencies);

    router.post("/register", [
        check('email').isEmail().normalizeEmail(),
        check('password').trim().isLength({ min: 6 }),
        check('username').notEmpty().trim().escape(),
    ], sanitize,
        controller.register);

    router.post("/login", [
        check('email').isEmail().normalizeEmail(),
        check('password').trim().notEmpty(),
    ], sanitize,
        controller.login);

    router.get('/search', [
        query('username').trim().notEmpty()
    ], sanitize, authenticate,
        controller.search)

    return router;
};

module.exports = userRouter;
