const express = require("express");
const router = express.Router();

const Hangout = require("../models/hangout"); // Matched to your Hangout.js file
const User = require("../models/User");       // Added User model for the accept logic

// GET all hangouts
router.get("/", async (req, res) => {
  try {
    // Adding .populate() lets us see the actual user details, not just their IDs
    const hangouts = await Hangout.find()
      .populate("host", "username profileImage") 
      .populate("pendingParticipants", "username profileImage")
      .populate("acceptedParticipants", "username profileImage");

    res.json(hangouts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE new hangout
router.post("/", async (req, res) => {
  try {
    const newHangout = new Hangout(req.body);
    const savedHangout = await newHangout.save();

    // Automatically add this hangout to the host's "createdHangouts" array
    await User.findByIdAndUpdate(req.body.host, {
      $push: { createdHangouts: savedHangout._id }
    });

    res.status(201).json(savedHangout);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
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
router.get("/dashboard/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Get Upcoming: Joined by user + Date is today or later + Sorted by nearest
    const upcoming = await Hangout.find({
      $or: [{ host: userId }, { acceptedParticipants: userId }],
      date: { $gte: new Date() } // Date is Greater Than or Equal to "Now"
    })
    .sort({ date: 1 }) // 1 = Ascending (closest first)
    .populate("host", "name");

    // 2. Get Recommended: Not joined by user + Randomly sampled
    const recommended = await Hangout.find({
      host: { $ne: userId },
      acceptedParticipants: { $ne: userId }
    })
    .limit(5); // Just grab 5 random-ish ones

    res.json({ upcoming, recommended });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newHangout = new Hangout(req.body);
    const savedHangout = await newHangout.save();
    res.status(201).json(savedHangout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;