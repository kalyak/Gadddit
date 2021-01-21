//handle all controller to /attendees
const express = require("express");
const Rooms = require("../models/RoomsSchema");
const Users = require("../models/UsersSchema");
const Qna = require("../models/QnASchema");
const router = express.Router();

let attendeeID = "";

const isAuthenticated = (req, res, next) => {
  console.log("session data:", req.session.currentUser);
  if (req.session.currentUser) {
    attendeeID = req.session.currentUser._id;
    next();
  } else {
    console.log("no session");
    res
      .status(401)
      .send({ unauthorized: "You are currently not logged in. Please log in" });
  }
};

//Get upcoming rooms that are public and not hosted by this attendee
router.get("/upcoming", isAuthenticated, (req, res) => {
  Rooms.find({
    $and: [
      { eventEnd: { $gte: new Date() } },
      { isPublic: true },
      { hostID: { $ne: attendeeID } },
    ],
  })
    .sort({ eventEnd: 1 })
    .exec((err, rooms) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        res.status(200).send(rooms);
      }
    });
});

//Get upcoming rooms that are public for the public page
router.get("/public", (req, res) => {
  Rooms.find({
    $and: [{ eventEnd: { $gte: new Date() } }, { isPublic: true }],
  })
    .sort({ eventEnd: 1 })
    .exec((err, rooms) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        res.status(200).send(rooms);
      }
    });
});

//Get past attended room
router.get("/past", isAuthenticated, (req, res) => {
  Users.findById(attendeeID)
    .populate({
      path: "roomAttendedHistory",
      options: { sort: "-eventEnd" },
      populate: { path: "questions" },
    })
    .exec((err, user) => {
      if (err) {
        res.status(500).send("Database error. Pls contact your system admin");
      } else {
        res.status(200).send(user.roomAttendedHistory);
      }
    });
});

// //to check credentials for private event + update roomAttendedHistory on user profile  + store roomInfo on the session
// router.post("/private", isAuthenticated, (req, res) => {
//   Rooms.findById(req.body.roomID, (err, room) => {
//     if (err) {
//       res
//         .status(500)
//         .send("Database error. Pls contact your system admin for rooms");
//     } else if (!room) {
//       res
//         .status(401)
//         .send("No room found. Please ensure you key in the correct room ID");
//     } else {
//       if (
//         req.body.roomCode === room.roomCode &&
//         req.body.roomPassword === room.roomPassword
//       ) {
//         req.session.currentRoom = room;
//         Users.findByIdAndUpdate(
//           attendeeID,
//           { $addToSet: { roomAttendedHistory: req.body.roomID } },
//           (err, user) => {
//             if (err) {
//               console.log("error on updating user profile");
//               res
//                 .status(500)
//                 .send(
//                   "Database error. Pls contact your system admin for users"
//                 );
//             }
//             res.status(200).send("successfully join");
//           }
//         );
//       } else {
//         res
//           .status(401)
//           .send("Please ensure the room code and room password is correct");
//       }
//     }
//   });
// });

//try 2
//to check credentials for private event + update roomAttendedHistory on user profile + store roomInfo on the session
router.post("/private", isAuthenticated, (req, res) => {
  Rooms.findOne({ roomCode: req.body.roomCode }, (err, room) => {
    if (err) {
      res.status(500).send({
        database: "Database error. Pls contact your system admin for rooms",
      });
    } else if (!room) {
      res.status(401).send({
        roomCode: "No room found. Please ensure you key in the correct room ID",
      });
    } else {
      if (
        req.body.roomCode === room.roomCode &&
        req.body.roomPassword === room.roomPassword
      ) {
        req.session.currentRoom = room;
        Users.findByIdAndUpdate(
          attendeeID,
          { $addToSet: { roomAttendedHistory: room._id } },
          (err, user) => {
            if (err) {
              console.log("error on updating user profile");
              res
                .status(500)
                .send(
                  "Database error. Pls contact your system admin for users"
                );
            }
            res.status(200).send({ roomID: room._id });
          }
        );
      } else {
        res.status(401).send({
          roomPassword:
            "Please ensure the room code and room password is correct",
        });
      }
    }
  });
});

//to check credentials for public event + update roomAttendedHistory on user profile + store roomInfo on the session
router.post("/:roomID", isAuthenticated, (req, res) => {
  Rooms.findById(req.params.roomID, (err, room) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else {
      if (
        req.body.roomCode === room.roomCode &&
        req.body.roomPassword === room.roomPassword
      ) {
        req.session.currentRoom = room;
        Users.findByIdAndUpdate(
          attendeeID,
          { $addToSet: { roomAttendedHistory: req.params.roomID } },
          (err, user) => {
            if (err) {
              res
                .status(500)
                .send("Database error. Pls contact your system admin");
            } else {
              res.status(200).send({ room: room });
            }
          }
        );
      } else {
        res
          .status(401)
          .send("Please ensure the room code and room password is correct");
      }
    }
  });
});

//get room information for room
router.get("/:roomID", isAuthenticated, (req, res) => {
  Rooms.findById(req.params.roomID, (err, room) => {
    if (err) {
      res.status(500).send("Database error. Pls contact your system admin");
    } else if (!room) {
      res.status(401).send("where's the room ah");
    } else {
      res.status(200).send(room);
    }
  });
});

module.exports = router;
