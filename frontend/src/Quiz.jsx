import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom' 

const Quiz = () => {
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
                    <h2>Quiz</h2>
                    <p>Test your language skills with interactive quizzes!</p>
                </>
            )}
        </div>
    )
}

export default Quiz

