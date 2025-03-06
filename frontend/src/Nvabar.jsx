import { Link } from 'react-router-dom'

const Navbar = () => {
    const isAuthenticated = localStorage.getItem('authToken')

    return (
        <nav>
            <ul>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                {isAuthenticated && (
                    <>
                    <Link to='/dashboard'>Dashboard</Link>
                    <button  onClick={() => localStorage.removeItem('authToken')}>Logout</button>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar