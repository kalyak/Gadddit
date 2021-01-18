//handle user login & logout
const express = require("express");
const sessions = express.Router();
const Users = require("../models/UsersSchema");
const bcrypt = require("bcrypt");

//user logging in => from Login button
sessions.post("/", (req, res) => {
  const filter = { username: req.body.username };
  //check database
  Users.findOne(filter, (err, foundUser) => {
    if (err) {
      console.log(error);
      res.status(500).send("Database error. Pls contact your system admin");
    } else if (!foundUser) {
      return res.status(401).send({ username: "No user found" });
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        console.log("logged in with " + req.body.password);
        console.log("current user", req.session.currentUser);
        res.status(200).send({
          _id: foundUser._id,
          username: foundUser.username,
          roomHostedHistory: foundUser.roomHostedHistory,
          roomAttendedHistory: foundUser.roomAttendedHistory,
        });
      } else {
        res.status(401).send({ password: "Password incorrect" });
      }
    }
  });
});

//user logging out
sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie(this.cookie, { path: "/" });
    res.status(200).send({ msg: "Logging out" });
  });
  // res.send("SESSION DELETE");
});

module.exports = sessions;
