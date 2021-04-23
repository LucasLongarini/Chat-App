const express = require("express");
const authenticateController = require('../controllers/authenticateController');
const { check } = require('express-validator');
const sanitize = require('./middleware/sanitize');
const authenticate = require('./middleware/authenticate');

const authenticationRouter = (dependencies) => {
    const router = express.Router();

    const controller = authenticateController(dependencies);

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

    router.get("/", authenticate, controller.authenticate);

    return router;
};

module.exports = authenticationRouter;
