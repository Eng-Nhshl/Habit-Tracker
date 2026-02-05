const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const { info, error } = require("./utils/logger");
const habitsRouter = require("./controllers/habits");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((err) => {
    error("error connecting to MongoDB:", err.message);
  });

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/habits", habitsRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
