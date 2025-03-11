import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import Flashcards from './flashcards'
import Profile from './Profile'
import Leaderboard from './Leaderboard'
import Quiz from './Quiz'
import Login from './Login'
import Register from './Register'
import './App.css'
import Home from './Home'

function App() {
  const [userAuth, setUserAuth] = useState(() => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    setUserAuth(user ? JSON.parse(user) : null)
  }, [])

  return (
    <Router>
      <div className="app-container">
        <Navbar userAuth={userAuth} setUserAuth={setUserAuth} />

        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setUserAuth={setUserAuth} />} />
              <Route path="/register" element={<Register setUserAuth={setUserAuth}/>} />
          
          {userAuth ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/quiz" element={<Quiz />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default App
