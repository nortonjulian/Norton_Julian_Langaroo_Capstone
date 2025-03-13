const express = require("express");
const Word = require("../models/Word");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch words" });
  }
});

router.get("/:language", async (req, res) => {
  const { language } = req.params;
  console.log(language)
  try {
    const words = await Word.find({ language: language });
    res.json(words);
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ error: "Failed to fetch words in desired language" });
  }
});

module.exports = router;
