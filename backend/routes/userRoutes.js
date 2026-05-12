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
    // .populate('createdEvents') tells Mongo to go find the actual 
    // Hangout data associated with those IDs!
    const user = await User.findById(req.params.id).populate('createdEvents');

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, username, bio, interests } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { name, username, bio, interests } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: "Username already exists" });
    res.status(500).json({ message: error.message });
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
      res.status(401).json({ message: "Wrong username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 4. UPDATE (Edit user profile)
// URL: PUT /api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const { name, username, bio, interests } = req.body;

    // ค้นหาและอัปเดตข้อมูล
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          username,
          bio,
          interests // มั่นใจว่าสะกดตรงกับใน Schema นะครับ
        }
      },
      { new: true, runValidators: true } // new: true เพื่อให้มันคืนค่าที่อัปเดตแล้วกลับมา
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    // กรณี username ซ้ำ
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists!" });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;