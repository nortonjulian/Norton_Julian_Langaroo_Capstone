const express = require("express");
// const UserProgress = require('..models/userProgress')
const User = require("../models/User");
const router = express.Router();

// router.get('/leaderboard', async (req, res) => {
//     try {
//         const leaderboard = await UserProgress.aggregate([
//             { $sort: { wordsLearned: -1 } },
//             { $limit: 10 }
//         ])
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// })

router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find({ score: -1 }).limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});

module.exports = router;
