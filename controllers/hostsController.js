//handle all controller to /hosts
const express = require("express");
const Rooms = require("../models/RoomsSchema");
const Users = require("../models/UsersSchema");
const router = express.Router();

let hostID = "";

const isAuthenticated = (req, res, next) => {
  console.log("session data:", req.session.currentUser);
  if (req.session.currentUser) {
    hostID = req.session.currentUser._id;
    next();
  } else {
    console.log("no session");
    res.status(401).send("You are currently not logged in. Please log in");
  }
};

// to find all rooms with hostID
router.get("/", isAuthenticated, (req, res) => {
  Rooms.find({ hostID }, (err, rooms) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      console.log(rooms);
      res.status(200).send(rooms);
    }
  });
});

//to show individual roomID
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
  const data = { ...req.body, hostID: hostID };

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

//update
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

// DELETE
router.delete("/:roomID", isAuthenticated, (req, res) => {
  console.log(req.params.id);
  Rooms.findByIdAndDelete(req.params.roomID, (err, result) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      Rooms.find({ hostID }, (err, rooms) => {
        res.status(200).send(rooms);
      });
    }
  });
});

module.exports = router;
