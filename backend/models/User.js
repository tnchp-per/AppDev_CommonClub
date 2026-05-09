const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
  interests: {
    type: [String],
    default: [],
  },
  createdHangouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hangout",
    },
  ],
  joinedHangouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hangout",
    },
  ],
});

// This line matches the variable name 'userSchema' above
module.exports = mongoose.model("User", userSchema);