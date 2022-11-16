const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  send_at: {
    type: Date,
    required: true,
  },
  read_at: {
    type: Date,
    default: null,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
FeedbackSchema.index({ fullname: "text", subject: "text", email: "text" });
module.exports = mongoose.model("Feedback", FeedbackSchema);
