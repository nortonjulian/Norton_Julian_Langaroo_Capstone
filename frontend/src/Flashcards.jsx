import { useState, useEffect } from "react";

const fetchAudioUrl = async (word, lang) => {
    const API_KEY = "YOUR_API_KEY";
    try {
        const response = await fetch(
            `https://apifree.forvo.com/action/word-pronunciations/format/json/word/${word}/language/${lang}/key/${API_KEY}`
        );
        const data = await response.json();
        return data.items?.[0]?.pathmp3 || null;
    } catch (error) {
        console.error("Error fetching audio:", error);
        return null;
    }
};

const Flashcards = () => {
    const [wordList, setWordList] = useState([]);
   
    useEffect(() => {
       
        // know the language //add inputs where user can choose language
        //get the words for that  language
        // loadaudiourls with those words
 
        const loadAudioUrls = async () => {
            const updatedWords = await Promise.all(
                wordList.map(async (word) => ({
                    ...word,
                    audioUrl: await fetchAudioUrl(word.word, word.lang),
                }))
            );
            setWordList(updatedWords);
        };

       
    }, []);

    return (
        <div>
            <h2>Flashcards</h2>
            {wordList.length === 0 ? (
                <p>No words to learn</p>
            ) : (
                wordList.map((word, index) => (
                    <div key={index}>
                        <h3>{word.word}</h3>
                        {word.audioUrl ? (
                            <button onClick={() => new Audio(word.audioUrl).play()}>
                                🔊 Listen
                            </button>
                        ) : (
                            <p>Audio not available</p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Flashcards;
