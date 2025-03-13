import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  
    const [user, setUser] = useState(null)
    // const [file, setFile] = useState(null)
    const navigate = useNavigate() 

    useEffect(() => {
        const user = localStorage.getItem('user')
        console.log(user)
        const token = localStorage.getItem('token')
        
        if (user) {
            const userId = JSON.parse(user).id
            fetch(`http://localhost:8080/api/users/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setUser(data)
                })
                .catch(error => {
                    console.log("Error fetching user data", error)
                })
        } else {
            navigate('/login') 
        }
    }, [navigate]) 


    let avgProgress = 0;
    if (user) {
        avgProgress = (user.progress.flashcards + user.progress.quizScores + user.progress.badges.length) / 3;
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
                       <p><strong>Progress:</strong>  {avgProgress.toFixed(2)}</p>
                       <p><strong>Leaderboard:</strong>  {user.leaderboard.badges}</p>
                    {/* <input 
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />   
                    <button onClick={handleFileUpload}>Upload</button>  */}
                    </div> 
                </>
            )}
        </div>
    )
}

export default Profile
