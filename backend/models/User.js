const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    nativeLanguage: { type: String },
    languageToLearn: { type: String },
    progress: { 
        flashcards: { type: Number, default: 0 },
        quizScores: { type: Number, default: 0 },
        badges: { type: [String], default: [] },
    },
    leaderboard: {
        score: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return null;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('users', userSchema, "users")

module.exports = User;