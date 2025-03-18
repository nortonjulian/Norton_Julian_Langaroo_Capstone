import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ userAuth, setUserAuth }) => {
  const location = useLocation()
  const noBorderPages = ["/", "/login", "/register"]

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUserAuth(false)
  }
    return (
        <nav className={`navbar ${noBorderPages.includes(location.pathname) ? 'no-border' : ''}`}>
          <Link to={userAuth ? "/profile" : "/"} className='home-link'>Langaroo</Link>

          <div className="nav-links">
            {userAuth ? (
              <>  
                <Link to="/profile">Profile</Link>
                <Link to="/practice">Word Practice</Link>
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