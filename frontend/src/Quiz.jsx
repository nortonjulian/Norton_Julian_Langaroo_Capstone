import { useEffect, useState } from 'react' 
import Flashcards from './flashcards'

const Quiz = () => {
    const [quizQuestions, setQuizQuestions] = useState([])
    const [toLang, setToLang] = useState("")
    const [words, setWords] = useState([])

    const generateQuizQuestions = (words) => {
        return words.map(({ word, translation }, _, allWords ) => {
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
        if (words.length > 0) {
            setQuizQuestions(generateQuizQuestions(words))
        }
    }, [words])

    const handleWordListUpdate = (newWords) => {
        setWords(newWords)
    }

    return (
        <div>
                <h2>Language Quiz - {toLang || "Select a Language"}</h2>
                <Flashcards setWordList={handleWordListUpdate} setToLang={setToLang} />

                {quizQuestions.length > 0 && (
                    <div>
                        {quizQuestions.map((question, index) => (
                            <div key={index}>
                                <p><strong>{question.word}</strong></p>
                                {question.options.map((option, i) => (
                                    <button key={i}>{option}</button>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            
        </div>
    )
}

export default Quiz

