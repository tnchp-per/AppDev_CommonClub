const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 1. REGISTER (CREATE a new user)
// URL: POST /api/users/
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. GET ALL (Helpful for debugging)
// URL: GET /api/users/
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found for ID:", req.params.id); // Add this log to your backend!
      return res.status(404).json({ message: "No user exists with this ID" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. LOGIN (The logic we just discussed)
// URL: POST /api/users/login
router.post("/login", async (req, res) => { // Changed 'app' to 'router' and path to '/login'
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        image: user.image
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;