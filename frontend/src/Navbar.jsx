import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Flashcards</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/quiz">Quiz</Link>
            <Link to="/auth">Profile</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    )
}

export default Navbar