const express = require("express");
const router = express.Router();
const User = require("../models/User");

// CREATE a new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    
    // Returns the newly created user (including their new _id!)
    res.status(201).json(savedUser); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all users (Super helpful for copying IDs later)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;