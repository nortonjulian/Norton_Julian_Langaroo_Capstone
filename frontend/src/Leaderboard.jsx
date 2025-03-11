import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'

const Leaderboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const navigate = useNavigate() 

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setIsLoggedIn(true)
        } else {
            navigate('/login') 
        }
    }, [navigate]) 

    return (
        <div>
            {isLoggedIn && (
                <>
                <h2>Leaderboard</h2>
                <p>Check out the top language learners and see where you rank!</p>
                </>
            )}
        </div>
    )
}

export default Leaderboard

