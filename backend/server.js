const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth')
const wordsRoutes = require('./routes/words')
const leaderboardRoutes = require('./routes/leaderboard')

app.use('/api/auth', authRoutes)
app.use('/api/words', wordsRoutes)
app.use('/api/auth', leaderboardRoutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log("MongoDB connection error: ", err))

app.listen(port, () => {
    console.log(`Server is running on port, ${port}`)
})


