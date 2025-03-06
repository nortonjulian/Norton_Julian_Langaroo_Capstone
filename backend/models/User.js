const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    nativeLanguage: { type: String, required: true },
    languageToLearn: { type: String, required: true },
    progress: { 
        flashcards: { type: Number, default: 0 },
        quizScores: { type: Number, default: 0 },
        badges: { type: [String], default: [] },
    },
    leaderboard: {
        score: { type: Number, default: 0 },
        badges: { type: Number, default: 0  },
    },
    createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.model('User', userSchema)

export default userSchema;