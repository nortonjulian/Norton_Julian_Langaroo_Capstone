const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth')
const wordsRoutes = require('./routes/words')
const leaderboardRoutes = require('./routes/leaderboard')
const userRoutes = require('./routes/user')
app.get("/",(req,res)=>{
    res.send("hello")
})

app.get("/api/proxy/audio", async (req, res) => {
    const { word, lang } = req.query;

    if (!word || !lang) {
        return res.status(400).json({ error: "Missing word or language" })
    }

    const apiUrl = `https://lingualibre.org/api/v1/recordings/list?query=${word}&lang=${lang}`

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log("data",data)
        res.json(data)
    } catch (error) {
        console.log("Error fetching audio", error)
        res.status(500).json({ error: "Failed to fetch audio "})
    }
})

app.use('/api/auth', authRoutes)
app.use('/api/words', wordsRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/users', userRoutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log("MongoDB connection error: ", err))

app.listen(port, () => {
    console.log(`Server is running on port, ${port}`)
})


