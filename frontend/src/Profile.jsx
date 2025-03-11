import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'

const Profile = () => {
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
                <h2>User Profile</h2>
                    <p>Welcome to your profile! Here you can update your information and track your progress.</p>

                </>
            )}
        </div>
    )
}

export default Profile
