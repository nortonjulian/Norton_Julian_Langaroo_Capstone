import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'

const BADGE_CRITERIA = [
    {name: "Beginner", condition: (score) => score >= 50 },
    {name: "Intermediate", condition: (score) => score >= 100 },
    {name: "Advanced", condition: (score) => score >= 150 },
    {name: "Master", condition: (score) => score >= 200 },
]

const Leaderboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate() 

    useEffect(() => {
        const fetchUsers = async () => {
                try {
                    const response = await fetch("http://localhost:8080/api/users")
                    const data = await response.json()

                    if (data.length > 0) {
                        setIsLoggedIn(true)
                    } else {
                        navigate('/login')
                    }
                    
                    const updatedUsers = data.map(user => {
                        const score = (user.progress.flashcards + user.progress.quizScores) / 2;

                        const earnedBadges = BADGE_CRITERIA.filter(badge => badge.condition(score)).map(b => b.name)
                        // const storedBadges = JSON.parse(localStorage.getItem(` badges_${user.id}`)) || []
                        return {...user, badges: earnedBadges, score }
                    })
                    setUsers(updatedUsers.sort((a, b) => b.score - a.score))
                } catch (error) {
                    console.log("Error fetching leadership data", error)
                }
         
        }
        fetchUsers()
    }, []) 

    return (
        <div>
            {isLoggedIn && (
                <>
                <h2>Leaderboard</h2>
                <p>Check out the top language learners and see where you rank!</p>
                
                <ul className="leaderboard-rank">
                    {users.map((user, index) => (
                        <ul key={user.id}>
                            <span><strong>{index + 1}</strong>. {user.username} = Score: {(user.progress.flashcards + user.progress.quizScores) / 2}</span>
                            {user.progress.badges.length > 0 && (
                                <>
                                    <br />
                                    <span><strong>{user.badges.join(", ")}</strong></span>
                                </>
                            )}
                        </ul>
                    ))}
                </ul>
                </>
            )}
        </div>
    )
}

export default Leaderboard

