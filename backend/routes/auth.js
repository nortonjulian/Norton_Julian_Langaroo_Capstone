const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

router.post("/register", async (req, res) => {
  const { username, password, email, nativeLanguage } = req.body;
  console.log(req.body)
  try {
    const userExists = await User.findOne({ username });
    if (userExists)return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, password, email, nativeLanguage });
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

    console.log("Login request received", req.body)

    const user = await User.findOne({ username });
    console.log(user)

    if (!user) return res.status(400).json({ message: "Invalid  credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid  credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    res.json({ 
        message: "Login successfully", 
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            nativeLanguage: user.nativeLanguage,
            languageToLearn: user.languageToLearn,
            progress: user.progress,
            Leaderboard: user.Leaderboard
         }, 
        });
  } catch (error) {
    console.log(error.message,"errs")
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
