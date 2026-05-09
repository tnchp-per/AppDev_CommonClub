const mongoose = require("mongoose");

const hangoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  
  // The person who created the hangout
  host: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  // People who have been approved to join
  acceptedParticipants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],

  // People who have requested to join but aren't approved yet
  pendingParticipants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],

  // General list (if you use this instead of accepted)
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }]
}, { timestamps: true }); // This adds createdAt and updatedAt automatically

module.exports = mongoose.model("Hangout", hangoutSchema);