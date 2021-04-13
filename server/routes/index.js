const express = require("express");
const userRoute = require("./userRoute");

const indexRouter = (dependencies) => {
  const router = express.Router();
  
  router.use("/user", userRoute(dependencies));
  
  return router;
};

module.exports = indexRouter;

