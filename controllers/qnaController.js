const express = require("express");
const Rooms = require("../models/RoomsSchema");
const Users = require("../models/UsersSchema");
const Qna = require("../models/QnASchema");
const router = express.Router();

let id = "";
let hostID = "";
let username = "";
let roomInfo = "";

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
  if (req.session.currentRoom) {
    console.log("room data:", req.session.currentRoom);
    roomID = req.session.currentRoom._id;
    roomInfo = req.session.currentRoom;
    next();
  } else {
    //check if the person is the host
    console.log("check if the person is the host");
    Rooms.findById(req.params.roomID, (err, room) => {
      hostID = room.hostID;
      if (hostID === id) {
        console.log("this person is the host");
        roomInfo = room;
        next();
      } else {
        //check if the person attended this room previously
        console.log("checking if the person attended this room prev");
        Users.findById(id, (err, user) => {
          const roomAttendedHistory = user.roomAttendedHistory;
          if (roomAttendedHistory.includes(req.params.roomID)) {
            console.log(
              "this person attended this room before, assigning roominfo"
            );
            roomInfo = room;
            next();
          } else {
            console.log("cannot assign room info");
            res.status(401).send("Not authenticated to room");
          }
        });
      }
    });
  }
};

//get all the qna when hosts start the room or attendees join room
router.get("/:roomID", isAuthenticated, isRoomAuthenticated, (req, res) => {
  console.log("getting q&a details...");
  Qna.find(
    { $and: [{ roomID: req.params.roomID }, { isFlagged: false }] },
    (err, qna) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        console.log("roominfo", roomInfo);
        res.status(200).send({
          roomInfo: roomInfo,
          qna: qna,
          userID: req.session.currentUser._id,
        });
      }
    }
  );
});

//get all the qna for public joining the room
router.get("/public/:roomID", (req, res) => {
  console.log("getting room details...");
  Rooms.findById(req.params.roomID, (err, room) => {
    roomInfo = room;
  });
  console.log("getting q&a details...");
  Qna.find(
    { $and: [{ roomID: req.params.roomID }, { isFlagged: false }] },
    (err, qna) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        console.log("roominfo", roomInfo);
        res.status(200).send({
          roomInfo: roomInfo,
          qna: qna,
          userID: "NOT_LOGGED_IN",
        });
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

//UPDATE - when user upvote
router.put(
  "/:roomID/:qnaID/upvote",
  isAuthenticated,
  isRoomAuthenticated,
  (req, res) => {
    Qna.findByIdAndUpdate(
      req.params.qnaID,
      { $addToSet: { upvote: id } },
      { upsert: true, new: true },
      (err, qna) => {
        if (err) {
          res.status(500).send("Database error. Pls contact your system admin");
        } else {
          console.log("upvote:", qna.upvote.length);
          res.status(200).send(qna);
        }
      }
    );
  }
);

//when user downvote
router.delete(
  "/:roomID/:qnaID/upvote",
  isAuthenticated,
  isRoomAuthenticated,
  (req, res) => {
    Qna.findByIdAndUpdate(
      req.params.qnaID,
      { $pullAll: { upvote: id } },
      { upsert: true, new: true },
      (err, qna) => {
        if (err) {
          res.status(500).send("Database error. Pls contact your system admin");
        } else {
          console.log("upvote:", qna.upvote.length);
          res.status(200).send(qna);
        }
      }
    );
  }
);

module.exports = router;
