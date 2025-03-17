const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("hit")
  try {
    const user = await User.find({})
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateFields = {...req.body, updatedAt: Date.now() }
    const user = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true })

    user ? res.json(user) : res.status(404).json({ error: "User not found" })
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting profile" })
  }
})

router.put("/:id/quiz-score", async (req, res) => {
  try {
    const { quizScore } = req.body;
    if (quizScore === undefined) {
      res.status(400).json({ error: "quizScore is required" })
    }
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { $set: { "progress.quizScores": quizScore } },
      { new: true}
    )

    user ? res.json(user) : res.status(404).json({ error: "User not found" })
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" })
  }
})

router.put("/:id/leader-score", async (req, res) => {
  try {
    const { leaderboardScore } = req.body;
    console.log(typeof leaderboardScore)
    if (leaderboardScore === undefined) {
      res.status(400).json({ error: "leaderboard is required" })
    }
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { $inc: { "leaderboard.score": Number(leaderboardScore)} },
      { new: true}
    )

    user ? res.json(user) : res.status(404).json({ error: "User not found" })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Error updating profile" })
  }
})



module.exports = router;
