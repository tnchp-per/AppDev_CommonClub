const express = require("express");
const router = express.Router();

const Hangout = require("../models/hangout"); // Matched to your Hangout.js file
const User = require("../models/User");       // Added User model for the accept logic

const mongoose = require('mongoose'); // Add this at the top of your routes file


// GET all hangouts
router.get("/dashboard/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const allHangouts = await Hangout.find().lean(); // Use .lean() for easier comparison

        // Fix: Check host OR acceptedParticipants
        const upcoming = allHangouts.filter(h => {
            const isHost = h.host && h.host.toString() === userId;
            const isGuest = h.acceptedParticipants && h.acceptedParticipants.some(id => id.toString() === userId);
            
            return isHost || isGuest;
        });

        // Recommended: Events where you are NOT the host AND NOT a participant
        const recommended = allHangouts.filter(h => {
            const isHost = h.host && h.host.toString() === userId;
            const isGuest = h.acceptedParticipants && h.acceptedParticipants.some(id => id.toString() === userId);
            
            return !isHost && !isGuest;
        });

        console.log(`User: ${userId} | Upcoming: ${upcoming.length} | Recs: ${recommended.length}`);
        
        res.json({ upcoming, recommended });
    } catch (err) {
        console.error("Dashboard error:", err);
        res.status(500).json({ message: err.message });
    }
});
// CREATE new hangout
router.post("/", async (req, res) => {
  try {
    const newHangout = new Hangout(req.body);
    const savedHangout = await newHangout.save();

    await User.findByIdAndUpdate(req.body.host, {
      $push: { createdEvents: savedHangout._id }
    });

    res.status(201).json(savedHangout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// --- NEW ROUTES FOR PARTICIPATION MANAGEMENT ---

// 1. REQUEST TO JOIN A HANGOUT
router.post("/:hangoutId/join", async (req, res) => {
  try {
    const { hangoutId } = req.params;
    const { userId } = req.body; 

    const hangout = await Hangout.findById(hangoutId);
    if (!hangout) return res.status(404).json({ message: "Hangout not found" });

    // Prevent joining if already pending or accepted
    if (hangout.pendingParticipants.includes(userId) || hangout.acceptedParticipants.includes(userId)) {
      return res.status(400).json({ message: "You have already requested to join this hangout." });
    }

    // Add user to the pending list
    hangout.pendingParticipants.push(userId);
    await hangout.save();

    res.status(200).json({ message: "Join request sent successfully!", hangout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. HOST ACCEPTS OR REJECTS A REQUEST
router.put("/:hangoutId/manage-request", async (req, res) => {
  try {
    const { hangoutId } = req.params;
    const { userId, action, hostId } = req.body; 

    const hangout = await Hangout.findById(hangoutId);
    if (!hangout) return res.status(404).json({ message: "Hangout not found" });

    // Security: Only the host can manage requests
    if (hangout.host.toString() !== hostId) {
      return res.status(403).json({ message: "Only the host can manage requests." });
    }

    if (action === "accept") {
      if (hangout.acceptedParticipants.length >= hangout.maxParticipants) {
        return res.status(400).json({ message: "Hangout is already full!" });
      }

      // Move from pending to accepted
      hangout.pendingParticipants.pull(userId);
      hangout.acceptedParticipants.push(userId);

      // Add to User's joined list
      await User.findByIdAndUpdate(userId, {
        $addToSet: { joinedHangouts: hangoutId }
      });

    } else if (action === "reject") {
      // Just remove from pending
      hangout.pendingParticipants.pull(userId);
    } else {
      return res.status(400).json({ message: "Invalid action. Use 'accept' or 'reject'." });
    }

    await hangout.save();
    res.status(200).json({ message: `User successfully ${action}ed.`, hangout });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Dashboard Data (Upcoming + Recommended)



router.post("/", async (req, res) => {
  try {
    const newHangout = new Hangout(req.body);
    const savedHangout = await newHangout.save();
    res.status(201).json(savedHangout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
    try {
        const allHangouts = await Hangout.find().sort({ date: 1 });
        res.json(allHangouts); // This sends an ARRAY directly to the frontend
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;