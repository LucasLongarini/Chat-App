const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const http = require('http');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dependencies = require('./config/dependencies');

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const { json, urlencoded } = express;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter(dependencies));
app.use("/ping", pingRouter);

// Start the DB
dependencies?.DBService?.init();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = { app, server };
