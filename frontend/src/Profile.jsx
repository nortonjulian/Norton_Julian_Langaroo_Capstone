import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import Quiz from './Quiz'
const Profile = () => {
  
    const [user, setUser] = useState(null)
    // const [file, setFile] = useState(null)
    const navigate = useNavigate() 

    const fetchUserData = async () => {
        const storedUser = localStorage.getItem('user')
        console.log(JSON.parse(user))
        const token = localStorage.getItem('token')
    
        if (storedUser) {
            const userId = JSON.parse(storedUser).id
            try {
                const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                setUser(data)   
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
                    <h2>User Profile</h2><br />
                       <p><strong>Username:</strong> {user.username}</p>
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
                        {user.progress.badges.length > 0 ? (
                            <ul>
                                {user.badges.map((badge, index) => (
                                    <li key={index}>{badge}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No badges earned yet. Keep learning!</p>
                        )}
       
                    </div> 
                </>
            )}
        </div>
    )
}

export default Profile
