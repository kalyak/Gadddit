const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QnASchema = new Schema(
  {
    roomID: { type: String },
    // hostID: { type: String },
    question: { type: String },
    questionBy_userID: { type: String }, //userid
    answer: { type: String, default: "" },
    upvote: { type: Number, default: 0 },
    // isAnswered: { type: Boolean, default: false },
    isHidden: { type: Boolean, default: false }, // when host delete
  },
  {
    timestamps: true,
  }
);

const Qna = mongoose.model("Qna", QnASchema);

module.exports = Qna;
