const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QnASchema = new Schema(
  {
    roomID: { type: String },
    question: { type: String },
    questionBy_userID: { type: String }, //userid
    questionBy: { type: String },
    answer: { type: String, default: "" },
    upvote: { type: Number, default: 0 },
    isFlagged: { type: Boolean, default: false }, // when host flag
  },
  {
    timestamps: true,
  }
);

const Qna = mongoose.model("Qna", QnASchema);

module.exports = Qna;
