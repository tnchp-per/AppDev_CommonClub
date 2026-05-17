const express = require("express");
const router = express.Router();

const Hangout = require("../models/hangout");
const User = require("../models/User");

const mongoose = require('mongoose');

const interestToCategoryMap = {
  "sports": "sports",
  "gym": "sports",
  "running": "sports",
  "soccer": "sports",
  "badminton": "sports",
  "pilates": "sports",
  "yoga": "sports",
  "fitness": "sports",
  "football": "sports",

  "cooking": "food",
  "cafe": "food",
  "baking": "food",
  "cafe hopping": "food",
  "fine-dining": "food",
  "buffet": "food",

  "concert": "music",
  "guitar": "music",
  "singing": "music",
  "bass": "music",

  "clubbing": "social",

  "travel": "adventure",
  "car": "adventure",

  "working": "study",
};



router.get("/dashboard/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userProfile = await User.findById(userId).lean();

    const userInterests = userProfile?.interests || [];
    const userMasterCategories = userInterests.map(interest => {
      const normalized = interest.toLowerCase().trim();
      return interestToCategoryMap[normalized] || normalized;
    });

    const allHangouts = await Hangout.find().lean();

    const upcoming = allHangouts.filter(h => {
      const isHost = h.host && h.host.toString() === userId;
      const isGuest = h.acceptedParticipants && h.acceptedParticipants.some(id => id.toString() === userId);

      return isHost || isGuest;
    });

    const joined = allHangouts.filter(h => {
      const isGuest = h.acceptedParticipants && h.acceptedParticipants.some(id => id.toString() === userId);

      return isGuest
    });

    const recommended = allHangouts.filter(h => {
      const isHost = h.host && h.host.toString() === userId;
      const isGuest = h.acceptedParticipants && h.acceptedParticipants.some(id => id.toString() === userId);

      const hangoutCategory = h.category?.toLowerCase().trim();

      const matchesInterests = userMasterCategories.includes(hangoutCategory);

      return !isHost && !isGuest && matchesInterests;
    });

    const finalRecommendations = recommended.length > 0
      ? recommended
      : allHangouts.filter(h => {
        const isHost = h.host && h.host.toString() === userId;
        const isGuest = h.acceptedParticipants && h.acceptedParticipants.some(id => id.toString() === userId);
        return !isHost && !isGuest;
      });

    const limitedRecommendations = finalRecommendations.slice(0, 7);

    console.log(`User: ${userId} | Upcoming: ${upcoming.length} | Recs: ${recommended.length}`);

    res.json({ upcoming, limitedRecommendations, joined });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: err.message });
  }
});

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

router.post("/:id/join", async (req, res) => {
  try {
    const { userId } = req.body;
    const hangoutId = req.params.id;
    const hangout = await Hangout.findById(hangoutId);

    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }

    if (hangout.host.toString() === userId) {
      return res.status(400).json({ message: "You are the host of this event" });
    }

    if (hangout.acceptedParticipants.includes(userId)) {
      return res.status(400).json({ message: "You have already joined this event" });
    }

    await Hangout.findByIdAndUpdate(hangoutId, {
      $addToSet: { pendingParticipants: userId }
    });

    res.status(200).json({ message: "Request sent to pending list!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:hangoutId/manage-request", async (req, res) => {
  try {
    const { hangoutId } = req.params;
    const { userId, action, hostId } = req.body;

    const hangout = await Hangout.findById(hangoutId);
    if (!hangout) return res.status(404).json({ message: "Hangout not found" });

    if (hangout.host.toString() !== hostId) {
      return res.status(403).json({ message: "Only the host can manage requests." });
    }

    if (action === "accept") {
      if (hangout.acceptedParticipants.length >= hangout.maxParticipants) {
        return res.status(400).json({ message: "Hangout is already full!" });
      }

      hangout.pendingParticipants.pull(userId);
      hangout.acceptedParticipants.push(userId);

      await User.findByIdAndUpdate(userId, {
        $addToSet: { joinedEvents: hangoutId }
      });

    }

    await hangout.save();
    res.status(200).json({ message: `User successfully ${action}ed.`, hangout });

  } catch (error) {
    res.status(500).json({ message: error.message });
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

router.get("/", async (req, res) => {
  try {
    const allHangouts = await Hangout.find().sort({ date: 1 });
    res.json(allHangouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const hangout = await Hangout.findById(req.params.id)
      .populate("host", "name image bio username interest")
      .populate("acceptedParticipants", "name image")
      .populate("pendingParticipants", "name image");

    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found in database" });
    }

    res.json(hangout);
  } catch (err) {
    console.error("Error fetching hangout by ID:", err);
    res.status(500).json({ message: "Invalid ID format or Server Error" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const hangoutId = req.params.id;

    const hangout = await Hangout.findById(hangoutId);
    if (!hangout) {
      return res.status(404).json({ message: "Hangout not found" });
    }

    await User.updateMany(
      { $or: [{ joinedEvents: hangoutId }, { createdEvents: hangoutId }] },
      { $pull: { joinedEvents: hangoutId, createdEvents: hangoutId } }
    );

    await Hangout.findByIdAndDelete(hangoutId);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during deletion" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedHangout = await Hangout.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedHangout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;