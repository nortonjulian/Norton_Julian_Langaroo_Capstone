const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password,email } = req.body;
  console.log(req.body)
  try {
    const userExists = await User.findOne({ username });
    if (userExists)return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, password, email });
    await user.save();

    res.status(201).json({ message: "User registered successfully", ...user });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Error registering user", error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "Invalid  credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid  credentials" });

    const token = JsonWebTokenError.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "User registered successfully", token,...user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
