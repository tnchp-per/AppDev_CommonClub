const mongoose = require("mongoose"); // <--- Add this!

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
  }, // In a real app, we encrypt this!
  username: { 
    type: String, 
    unique: true 
  },
  bio: String,
  image: String,
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