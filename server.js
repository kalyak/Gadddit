require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () =>
  console.log("mongo connected: ", process.env.MONGODB_URI)
);
db.on("disconnected", () => console.log("mongo disconnected"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const attendeesController = require("./controllers/attendeesController.js");
app.use("/attendees", attendeesController);

const hostsController = require("./controllers/hostsController.js");
app.use("/hosts", hostsController);

const sessionsController = require("./controllers/sessionsController.js");
app.use("/sessions", sessionsController);

const usersController = require("./controllers/usersController.js");
app.use("/users", usersController);

const qnaController = require("./controllers/qnaController.js");
app.use("/qna", qnaController);

app.listen(process.env.PORT || 4000);
