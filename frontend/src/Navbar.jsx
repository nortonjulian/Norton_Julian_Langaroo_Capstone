import { Link } from 'react-router-dom'
import Login from './Login';
import Register from './Register';

const Navbar = ({ userAuth, setUserAuth }) => {
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUserAuth(false)
  }
    return (
        <nav className="navbar">
          <Link to={userAuth ? "/profile" : "/"} className='home-link'>Langaroo</Link>

          <div className="nav-links">
            {userAuth ? (
              <>  
                <Link to="/profile">Profile</Link>
                <Link to="/flashcards">Flashcards</Link>
                <Link to="/quiz">Quiz</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </>
            ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )}
          </div>
        </nav>
      );
}

export default Navbar