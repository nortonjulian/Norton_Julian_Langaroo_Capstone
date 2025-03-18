import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from './App'

const BADGE_CRITERIA = [
    {name: "Beginner", condition: (score) => score >= 50 },
    {name: "Intermediate", condition: (score) => score >= 100 },
    {name: "Advanced", condition: (score) => score >= 150 },
    {name: "Master", condition: (score) => score >= 200 },
]

const Profile = () => {
  
    const [user, setUser] = useState(null)
    // const [file, setFile] = useState(null)
    const navigate = useNavigate() 

    const fetchUserData = async () => {
        const storedUser = localStorage.getItem('user')
        console.log(JSON.parse(user))
        const token = localStorage.getItem('token')
    
        if (storedUser) {
            console.log(storedUser)
            const userId = JSON.parse(storedUser).id
            try {
                const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                })
                const data = await response.json()

                const score = (data.progress.quizScores) 
                console.log(score)
                const earnedBadges = BADGE_CRITERIA.filter(badge => badge.condition(score)).map(b => b.name);
                setUser({...data, badges: earnedBadges })   
            } catch (error) {
                console.log("Error fetching use data", error)
            }
        } else {
            navigate('/login') 
        }
    }  

    useEffect(() => {
        fetchUserData()
    }, []) 

    const handleDeleteAccount = async () => {
    
        if (!user?._id) return;

        if (!window.confirm("Are you sure? this action is irreversible.")) return

        try {
            const response = await fetch(`${BASE_URL}/api/users/${user._id}`, { 
                method: "DELETE" 
            })

            const result = await response.json()
            console.log("Delete response", result)

            if (!response.ok) {
                throw new Error("Failed to delete account")
            }

            alert("Account successfully deleted. You will be logged out.")
            setUser(null)
            localStorage.clear()
            navigate("/")
        } catch (error) {
            console.log("Failed to delete account:", error)
            alert("An error occurred while deleting your account.")
        }
    }
 

    let avgProgress = 0;
    if (user) {
        avgProgress = (user.progress.flashcards + user.progress.quizScores) / 2;
    }
    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0]
    //     if (selectedFile) {
    //         setFile(selectedFile)
    //         const reader = new FileReader()
    //         reader.onloadend = () => {
    //             // setUserPic(reader.result)
    //         }
    //         reader.readAsDataURL(selectedFile)
    //     }
    // }

    // const handleFileUpload = () => {
    //     const user = localStorage.getItem('user')
    //     const token = localStorage.getItem('token')

    //     if (!file) return alert("Please select a file to upload") 

    //     const formData = new FormData()
    //     formData.append("profilePic", file)
        
    //     const userId = JSON.parse(user).id

    //     fetch(`http://localhost:8080/api/users/${userId}`, {
    //         method: "PUT",
    //         headers: {
    //             "Authorization": `Bearer ${token}`,
    //         },
    //         body: formData,
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.profilePic) {
    //             // setUserPic(data.profilePic)
    //         }
    //     })
    //     .catch(error => {
    //         console.log("Error uploading image", error)
    //     })

    // }
    return (
        <div>
            {user && (
                <>
                    <div className='user-container'>
                    <h2>{user.username}'s Profile</h2><br />
                       <p><strong>Native Language:</strong> {user.nativeLanguage}</p>
                       <p><strong>Learning Score:</strong>  {avgProgress.toFixed(2)}</p>
                       <p><strong>Leaderboard:</strong>  {user.leaderboard.badges}</p>
                    {/* <input 
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />   
                    <button onClick={handleFileUpload}>Upload</button>  */}
                    <h3>Badges Earned:</h3>
                        {user.progress.badges.length === 0 ? (
                            <p>No badges earned yet. Keep learning!</p>
                        ) : (
                            <ul>
                               {BADGE_CRITERIA.map((badge, index) => (
                                <li key={index} style={{ color: user.badges.includes(badge.name) ? "black" : "gray" }}>
                                    {user.badges.includes(badge.name) ? "🏆" : "🔒"} {badge.name}
                                </li>
                               ))}
                            </ul>  
                        )}
                        {/* Delete Button */}
                        <button  className="profile-delete" onClick={handleDeleteAccount}>
                            Delete Account
                        </button>
                    </div> 
                </>
            )}
        </div>
    )
}

export default Profile
