const mongoose = require("mongoose");

const hangoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  
  // --- NEW FIELDS ADDED HERE ---
  category: { 
    type: String, 
    required: true,
    //enum: ["Social", "Sports", "Study", "Food"] // Optional: limits to these choices
  },
  date: { 
    type: Date, 
    required: true 
  },
  endTime: { 
    type: Date, 
    required: true 
  }, 
  duration: { type: String }, 

  maxParticipants: { 
    type: Number, 
    default: 5 
  },

  host: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  acceptedParticipants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
  pendingParticipants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }]
}, { timestamps: true });

module.exports = mongoose.model("Hangout", hangoutSchema);