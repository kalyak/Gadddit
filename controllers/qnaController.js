const express = require("express");
const Rooms = require("../models/RoomsSchema");
const Users = require("../models/UsersSchema");
const Qna = require("../models/QnASchema");
const router = express.Router();

let id = "";
let hostID = "";
let username = "";

const isAuthenticated = (req, res, next) => {
  console.log("session data:", req.session.currentUser);
  if (req.session.currentUser) {
    id = req.session.currentUser._id;
    username = req.session.currentUser.username;
    next();
  } else {
    console.log("no session");
    res.status(401).send("You are currently not logged in. Please log in");
  }
};

const isRoomAuthenticated = (req, res, next) => {
  console.log("room data:", req.session.currentRoom);
  if (req.session.currentRoom) {
    roomID = req.session.currentRoom._id;
    next();
  } else {
    Rooms.findById(req.params.roomID, (err, room) => {
      hostID = room.hostID;
      if (hostID === id) {
        next();
      } else {
        res.status(401).send("Not authenticated to room");
      }
    });
  }
};

//get all the qna when hosts start the room or attendees join room
router.get("/:roomID", isAuthenticated, isRoomAuthenticated, (req, res) => {
  Qna.find(
    { $and: [{ roomID: req.params.roomID }, { isFlagged: false }] },
    (err, qna) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        res.status(200).send(qna);
      }
    }
  );
});

//get single qna details
router.get(
  "/:roomID/:qnaID",
  isAuthenticated,
  isRoomAuthenticated,
  (req, res) => {
    Qna.findById(req.params.qnaID, (err, qna) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        res.status(200).send(qna);
      }
    });
  }
);

//create a new question
router.post(
  "/:roomID/new",
  isAuthenticated,
  isRoomAuthenticated,
  (req, res) => {
    const data = {
      ...req.body,
      roomID: req.params.roomID,
      questionBy_userID: id,
      questionBy: username,
    };

    Qna.create(data, (err, createdQna) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        Rooms.findByIdAndUpdate(
          req.params.roomID,
          { $push: { questions: createdQna._id } },
          (err, room) => {
            if (err) {
              res
                .status(500)
                .send("Database error. Pls contact your system admin");
            } else {
              res.status(200).send(createdQna);
            }
          }
        );
      }
    });
  }
);

//UPDATE
router.put(
  "/:roomID/:qnaID",
  isAuthenticated,
  isRoomAuthenticated,
  (req, res) => {
    Qna.findByIdAndUpdate(
      req.params.qnaID,
      req.body,
      { upsert: true, new: true },
      (err, qna) => {
        if (err) {
          res.status(500).send("Database error. Pls contact your system admin");
        } else {
          res.status(200).send(qna);
        }
      }
    );
  }
);

module.exports = router;
