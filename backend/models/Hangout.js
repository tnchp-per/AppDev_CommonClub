
const mongoose = require("mongoose");

const hangoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  maxParticipants: {
    type: Number,
    required: true,
  },

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hangout", hangoutSchema);