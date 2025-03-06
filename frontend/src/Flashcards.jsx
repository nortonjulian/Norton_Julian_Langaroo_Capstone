// import react from 'react'

const Flashcards = ({ words = [] }) => {
    return (
        <div>
            <h2>Flashcards</h2>
            {words.length === 0 ? (
                <p>No words to learn</p>
            ) : (
               words.map((word, index) => (
                <div key={index}>
                    <h3>{word.word}</h3>
                    {word.audioUrl ? (
                    <button onClick={() => new Audio(word.audioUrl).play()}>
                    🔊  Listen
                    </button>
               ) : (
                    <p>Audio not available</p>
                )}
                </div>
               ))     
            )}
        </div>
    )
}

export default Flashcards