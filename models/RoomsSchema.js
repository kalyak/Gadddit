const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomsSchema = new Schema(
  {
    eventName: { type: String },
    roomCode: { type: String }, //during room creation, see if can get last 6 of _id to be in
    roomPassword: { type: String },
    hostID: { type: String },
    eventStart: { Date },
    eventEnd: { Date },
    isPublic: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Rooms = mongoose.model("Rooms", RoomsSchema);

module.exports = Rooms;
