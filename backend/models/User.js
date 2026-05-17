const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true, unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true
  },
  bio: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: "default.png"
  },
  interests: [String],

  createdEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hangout'
  }],

  joinedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hangout'
  }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);