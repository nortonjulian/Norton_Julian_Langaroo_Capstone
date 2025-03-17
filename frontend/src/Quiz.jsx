import { useEffect, useState, useRef } from 'react' 

const Quiz = () => {
    const [quizQuestions, setQuizQuestions] = useState([])
    const [toLang, setToLang] = useState("")
    const [words, setWords] = useState([])
    const [userAnswers, setUserAnswers] = useState({})
    const [score, setScore] = useState(null)
    const wordsUpdated = useRef(false)

    const generateQuizQuestions = (words) => {
        const shuffleWords = [...words].sort(() => Math.random() - .5)
        return shuffleWords.map(({ word, translation }, _, allWords ) => {
            const incorrectAns = allWords
            .map((w) => w.translation)
            .filter((t) => t != translation)
            .sort(() => Math.random() - .5)
            .slice(0, 3)

            const options = [...incorrectAns, translation].sort(() => Math.random() - .5)

            return { word, correctedAns: translation, options }
        })
    }

    useEffect(() => {
        if (words.length > !wordsUpdated.current) {
            setQuizQuestions(generateQuizQuestions(words))
            wordsUpdated.current = true
        }
    }, [words])

    const handleWordListUpdate = (newWords) => {
        console.log("Received words", newWords)
        setWords(newWords)
    }

    const handleAnswerChange = (questionIdx, optionValue) => {
        setUserAnswers({
            ...userAnswers,
            [questionIdx]: optionValue
        })
    }

    const updateQuizScore = async (userId, newScore) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}/quiz-score`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ quizScore: newScore })
            })
            const data = await response.json()
            console.log("Updated quiz score:", data)
        } catch (error) {
            console.log("Error updating quiz score", error)
        }
    }

    const updateLeaderboardScore = async (userId, newLeaderboardScore) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}/leader-score`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ leaderboardScore: newLeaderboardScore })
            })
            const data = await response.json()
            console.log("Updated leaderboard score:", data)
        } catch (error) {
            console.log("Error updating leaderboard score", error)
        }
    }

    const handleSubmit = async () => {
        let calculatedScore = 0;
        quizQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.correctedAns) {
                calculatedScore += 1
            }
        })
        setScore(calculatedScore)

        const storedUser = JSON.parse(localStorage.getItem('user'))
        console.log(storedUser)
        console.log(storedUser.leaderboard)
        const userId = storedUser.id;
        await updateQuizScore(userId, calculatedScore)
        await updateLeaderboardScore(userId,  calculatedScore)
     
    }
        const fetchWords = async (e) => {
            let language = e.target.value
            setToLang(language)
            console.log("test")
        //  setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/words/${language}`)
                const data = await response.json()
                console.log("Raw response", data)
                    handleWordListUpdate(data[0].words)
                
            } catch (error) {
                console.log("Error fetching words", error)
            }
        //  setLoading(false)
    }

    return (
        <div>
                <h2>Language Quiz - {toLang || "Select a Language"}</h2>
                {/* <Flashcards setWordList={handleWordListUpdate} setToLang={setToLang} /> */}
                <div>
                <label className='quiz-label'>Language:</label>
                <select value={toLang} onChange={(e) => fetchWords(e)}>
                    <option value="">Select Language</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Danish">Danish</option>
                    <option value="Dutch">Dutch</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Greek">Greek</option>
                    <option value="Hebrew">Hebrew</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Italian">Italian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Mandarin Chinese">Mandarin Chinese</option>
                    <option value="Norwegian">Norwegian</option>
                    <option value="Polish">Polish</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="Russian">Russian</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Swedish">Swedish</option>
                    <option value="Turkish">Turkish</option>
                </select>
            </div>

                {quizQuestions.length > 0 && (
                    <div className='quiz-container'>
                        {quizQuestions.map((question, index) => (
                            <div key={index}>
                                <p><strong>{question.word}</strong></p>
                                {question.options.map((option, i) => (
                                    <div key={i}>
                                        <input
                                          type="radio"
                                          id= {`question-${index}-option${i}`}
                                          name={`question-${index}`}
                                          value={option}
                                          onChange={() => handleAnswerChange(index, option)}
                                        /> 
                                        <label htmlFor={`question-${index}-option${i}`}>{option}</label> 
                                    </div>
                                ))}
                            </div>
                        ))}
                        <div className='quiz-button'>
                        <button onClick={handleSubmit}>Submit</button>
                        </div>  
                    </div>
                )}
                {score !== null && (
                    <div>
                        <p>Your score: <strong>{score} out of {quizQuestions.length} ({((score / quizQuestions.length) * 100).toFixed(2)}%)</strong></p>
                    </div>
                )}
        </div>
    )
}

export default Quiz

