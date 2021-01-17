//handle all controller to /hosts
const express = require("express");
const Rooms = require("../models/RoomsSchema");
const Users = require("../models/UsersSchema");
const Qna = require("../models/QnASchema");
const router = express.Router();

let hostID = "";
let hostName = "";

const isAuthenticated = (req, res, next) => {
  console.log("session data:", req.session.currentUser);
  if (req.session.currentUser) {
    hostID = req.session.currentUser._id;
    hostName = req.session.currentUser.username;
    next();
  } else {
    console.log("no session");
    res.status(401).send("You are currently not logged in. Please log in");
  }
};

// to find all upcoming room
router.get("/upcoming", isAuthenticated, (req, res) => {
  Rooms.find({ hostID }, (err, rooms) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      const upcoming = rooms.filter(
        (room) => Date.parse(room.eventStart) > new Date()
      );
      res.status(200).send(upcoming);
    }
  });
});

// to find all past room + extract the QnA for respective rooms
router.get("/past", isAuthenticated, (req, res) => {
  Rooms.find({ hostID }, (err, rooms) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      const past = rooms.filter(
        (room) => Date.parse(room.eventStart) < new Date()
      );
      let data = [];
      past.map((room, index) => {
        Qna.find({ roomID: room._id }, (err, qna) => {
          if (err) {
            res
              .status(500)
              .send("Database error. Pls contact your system admin");
          } else {
            if (qna.length === 0) {
              data.push(room);
              if (index === rooms.length - 1) {
                return res.status(200).send(data);
              }
            } else {
              data.push({ ...room, questions: qna });
              if (index === rooms.length - 1) {
                return res.status(200).send(data);
              }
            }
          }
        });
      });
    }
  });
});

// to find all rooms with hostID + extract the QnA for respective rooms
router.get("/", isAuthenticated, (req, res) => {
  Rooms.find({ hostID }, (err, rooms) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      let data = [];
      rooms.map((room, index) => {
        Qna.find({ roomID: room._id }, (err, qna) => {
          if (err) {
            res
              .status(500)
              .send("Database error. Pls contact your system admin");
          } else {
            console.log("qna", qna);
            if (qna.length === 0) {
              data.push(room);
              if (index === rooms.length - 1) {
                res.status(200).send(data);
              }
            } else {
              data.push({ ...room, questions: qna });
              if (index === rooms.length - 1) {
                res.status(200).send(data);
              }
            }
          }
        });
      });
    }
  });
});

//to show individual room - to edit upcoming event
router.get("/:roomID", isAuthenticated, (req, res) => {
  Rooms.findById(req.params.roomID, (err, room) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      console.log(room);
      res.status(200).send(room);
    }
  });
});

// to create a new room + return roomCode + update roomHostedHistory on userDetail
router.post("/rooms/new", isAuthenticated, (req, res) => {
  const data = { ...req.body, hostID: hostID, hostName: hostName };

  Rooms.create(data, (err, createdRoom) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      const roomID = createdRoom._id.toString();
      const roomCode = roomID.slice(roomID.length - 6, roomID.length);

      Rooms.findByIdAndUpdate(
        roomID,
        { roomCode: roomCode },
        { upsert: true, new: true },
        (err, room) => {
          if (err) {
            res
              .status(500)
              .send("Database error. Pls contact your system admin");
          } else {
            console.log(room);
            Users.findByIdAndUpdate(
              hostID,
              {
                $push: { roomHostedHistory: createdRoom._id },
              },
              (err, user) => {
                if (err) {
                  res
                    .status(500)
                    .send("Database error. Pls contact your system admin");
                }
              }
            );
            res.status(200).send(room);
          }
        }
      );
    }
  });
});

//UPDATE
router.put("/:roomID", isAuthenticated, (req, res) => {
  Rooms.findByIdAndUpdate(
    req.params.roomID,
    req.body,
    { upsert: true, new: true },
    (err, room) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        res.status(200).send(room);
      }
    }
  );
});

// DELETE + update roomHostedHistory on userDetail
router.delete("/:roomID", isAuthenticated, (req, res) => {
  Rooms.findByIdAndDelete(req.params.roomID, (err, deletedRoom) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      Users.findById(hostID, (err, user) => {
        if (err) {
          res.status(500).send("Database error. Pls contact your system admin");
        } else {
          const deletedRoomID = deletedRoom._id;
          Users.findByIdAndUpdate(
            hostID,
            { $pullAll: { roomHostedHistory: [deletedRoomID] } },
            { upsert: true, new: true },
            (err, user) => {
              if (err) {
                res
                  .status(500)
                  .send(
                    " error here Database error. Pls contact your system admin"
                  );
              } else {
                res.status(200).send(deletedRoom);
              }
            }
          );
        }
      });
    }
  });
});

module.exports = router;
