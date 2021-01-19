const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roomHostedHistory: { type: Array },
    roomAttendedHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Rooms" },
    ],
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
