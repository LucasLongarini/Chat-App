const express = require("express");
const userController = require('../controllers/userController');
const { query } = require('express-validator');
const sanitize = require('./middleware/sanitize');
const authenticate = require('./middleware/authenticate');

const userRouter = (dependencies) => {
    const router = express.Router();

    const controller = userController(dependencies);

    router.get('/search', [
        query('username').trim().notEmpty()
    ], sanitize, authenticate,
        controller.search)

    return router;
};

module.exports = userRouter;