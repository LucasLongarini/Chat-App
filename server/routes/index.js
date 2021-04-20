const express = require("express");
const authenticateRoute = require("./authenticateRoute");
const conversationsRoute = require('./conversationsRoute');
const usersRoute = require('./usersRoute');

const indexRouter = (dependencies) => {
  const router = express.Router();
  
  router.use("/authenticate", authenticateRoute(dependencies));
  router.use("/conversations", conversationsRoute(dependencies));
  router.use("/users", usersRoute(dependencies));
  return router;
  
};

module.exports = indexRouter;

