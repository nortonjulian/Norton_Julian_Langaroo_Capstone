const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    word: { type: String, required: true },
    translation: { type: String, required: true },
    language: { type: String, required: true },
    pronunciation: String,
})

const word = mongoose.model("wordLists",wordSchema,"wordLists")
module.exports = word;