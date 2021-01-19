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
  Rooms.find(
    {
      $and: [{ eventStart: { $gte: new Date() } }, { hostID: hostID }],
    },
    (err, rooms) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        res.status(200).send(rooms);
      }
    }
  );
});

// to find all past room + extract the QnA for respective rooms
router.get("/past", isAuthenticated, async (req, res) => {
  Rooms.find({
    $and: [{ eventStart: { $lt: new Date() } }, { hostID: hostID }],
  })
    .populate("questions")
    .exec((err, room) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        res.status(200).send(room);
      }
    });
});

// to find all rooms with hostID + extract the QnA for respective rooms
router.get("/", isAuthenticated, (req, res) => {
  Rooms.find({ hostID })
    .populate("questions")
    .exec((err, rooms) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        res.status(200).send(rooms);
      }
    });
});

//to show individual room - for subsequent edit purpose
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
                $addToSet: { roomHostedHistory: createdRoom._id },
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
