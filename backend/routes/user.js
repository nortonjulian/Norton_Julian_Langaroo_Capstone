const express = require("express");
const User = require("../models/User");
const router = express.Router();

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

module.exports = router;
