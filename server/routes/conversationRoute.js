const express = require("express");
const ConversationController = require('../controllers/conversationController');
const { param, body } = require('express-validator');
const sanitize = require('./middleware/sanitize');
const authenticate = require('./middleware/authenticate');

const conversationRouter = (dependencies) => {
    const router = express.Router();

    const controller = ConversationController(dependencies);

    router.get("/", authenticate,
        controller.getAll);

    router.get("/:id/messages", [
        param('id').trim().notEmpty(),
    ], sanitize, authenticate,
        controller.getMessages);

    router.post("/", [
        body('userIds').isArray().notEmpty(),
    ], sanitize, authenticate,
        controller.create);

    return router;
};

module.exports = conversationRouter;