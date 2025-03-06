import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './Navbar'
import Flashcards from './flashcards'
import AuthProfile from './AuthProfile'
import Leaderboard from './Leaderboard'
import Quiz from './Quiz'
import Login from './Login'
import Register from './Register'
// import axios from 'axios'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useState(0)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <div>
      <h1>Langaroo</h1>
      <h2>Jump into Language Learning!</h2>
      <Router>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
          <Routes>
          {!isLoggedIn && (
             <>
              <Route path="/login" element={<div className="route-container"><Login /></div>} />
              <Route path="/register" element={<div className="route-container"><Register /></div>} />
             </>
          )}
          {isLoggedIn && (
            <>
              <Route path="/" element={<div className="route-container"><Flashcards /></div>}/> 
              <Route path="/auth" element={<div className="route-container"><AuthProfile /></div>} />
              <Route path="/leaderboard" element={<div className="route-container"><Leaderboard /></div>} />
              <Route path="/quiz" element={<div className="route-container"><Quiz /></div>} />
            </>
          )}
          </Routes>
      </Router>
    </div>
  )
}

export default App
