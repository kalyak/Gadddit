const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomsSchema = new Schema(
  {
    eventName: { type: String },
    roomCode: { type: String },
    roomPassword: { type: String },
    hostID: { type: String },
    hostName: { type: String },
    eventStart: { type: Date },
    eventEnd: { type: Date },
    isPublic: { type: Boolean },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Qna" }],
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Rooms = mongoose.model("Rooms", RoomsSchema);

module.exports = Rooms;
