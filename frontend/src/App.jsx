// import { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Flashcards from '/Flashcards'
// import AuthProfile from '/AuthProfile'
// import Leaderboard from '/Flashcards'
// import Quiz from '/Quiz'
import Login from '/Login'
import Register from '/Register'
// import axios from 'axios'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Langaroo</h1>
      <h2>Jump into Language Learning!</h2>
      <Routes>
        <Route path="/" element={<Flashcards />}/>
        <Route path="/auth" element={<AuthProfile />}/>
        <Route path="/leaderboard" element={<Leaderboard />}/>
        <Route path="/quiz" element={<Quiz />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </div>
  )
}

export default App
