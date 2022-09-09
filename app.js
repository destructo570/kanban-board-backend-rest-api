const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const app = express();

const boardRoutes = require("./routes/board");
const listRoutes = require("./routes/list");
const cardRoutes = require("./routes/card");
const authRoutes = require("./routes/auth");

const bodyParser = require("body-parser");
const setHeaders = require("./middleware/headers");
const sendErrorResponse = require("./controllers/error");

app.use(bodyParser.json());
app.use(helmet());
app.use(setHeaders);

app.use("/auth", authRoutes);
app.use("/board", boardRoutes);
app.use("/list", listRoutes);
app.use("/card", cardRoutes);

app.use(sendErrorResponse);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.oysbklc.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority`
  )
  .then(() => app.listen(process.env.PORT || 8080))
  .catch((err) => console.log(err));
