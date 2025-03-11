import React from 'react'
import { useNavigate } from 'react-router-dom'

 const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="welcome-container">
    <h1>Langaroo</h1>
    <h2>Jump into Language Learning!</h2>
 
    <div className='auth-links'>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button>
    </div>

  </div>
  )
}

export default Home