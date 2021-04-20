const express = require("express");
const userRoute = require("./userRoute");
const conversationRoute = require('./conversationRoute');

const indexRouter = (dependencies) => {
  const router = express.Router();
  
  router.use("/user", userRoute(dependencies));
  router.use("/conversation", conversationRoute(dependencies));
  return router;
  
};

module.exports = indexRouter;

