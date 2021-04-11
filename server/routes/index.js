const express = require("express");
const router = express.Router();
const userRoute = require("./user");
const conversationRoute = require("./conversation");

router.get("/welcome", function (req, res, next) {
  res.status(200).send({ welcomeMessage: "Welcome!" });
});

router.use("/user", userRoute);

router.use("/conversation", conversationRoute);

module.exports = router;
