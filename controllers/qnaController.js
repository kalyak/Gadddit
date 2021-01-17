const express = require("express");
const Rooms = require("../models/RoomsSchema");
const Users = require("../models/UsersSchema");
const Qna = require("../models/QnASchema");
const router = express.Router();

let id = "";

const isAuthenticated = (req, res, next) => {
  console.log("session data:", req.session.currentUser);
  if (req.session.currentUser) {
    id = req.session.currentUser._id;
    next();
  } else {
    console.log("no session");
    res.status(401).send("You are currently not logged in. Please log in");
  }
};

//get all the qna when hosts start the room or attendees join room
router.get("/:roomID", isAuthenticated, (req, res) => {
  Qna.find({ roomID: req.params.roomID }, (err, qna) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      res.status(200).send(qna);
    }
  });
});

//create a new question
router.post("/:roomID/new", isAuthenticated, (req, res) => {
  const data = {
    ...req.body,
    roomID: req.params.roomID,
    questionBy_userID: id,
  };

  Qna.create(data, (err, createdQna) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      Users.findById(id, (err, user) => {
        if (err) {
          res.status(500).send("Database error. Pls contact your system admin");
        } else {
          res.status(200).send({ ...createdQna, username: user.username });
        }
      });
    }
  });
});

//UPDATE
router.put("/:roomID/:qnaID", isAuthenticated, (err, qna) => {
  Qna.findByIdAndUpdate(
    req.params.qnaID,
    isAuthenticated,
    { upsert: true, new: true },
    (err, qna) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        Users.findById(id, (err, user) => {
          if (err) {
            res
              .status(500)
              .send("Database error. Pls contact your system admin");
          } else {
            res.status(200).send({ ...qna, username: user.username });
          }
        });
      }
    }
  );
});

module.exports = router;
