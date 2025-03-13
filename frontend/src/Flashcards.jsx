import { useState, useEffect } from "react";
import { TextToSpeech } from '@capacitor-community/text-to-speech';

const Flashcards = ({ setWordList, setToLang}) => {
    const [wordList, setLocalWordList] = useState([]);
    const [toLang, localSetToLang] = useState("");
    const [loading, setLoading] = useState(false);
   
    const listen = async(word )=>{
        // const languages = await TextToSpeech.getSupportedLanguages();
        // console.log(languages)
        
        const codes ={
            "Arabic" : "ar-001",
            "Danish": "da-DK",
            "Dutch" : "nl-NL (for Netherlands), nl-BE (for Belgium)",
            "French" : "fr-FR (France), fr-CA (Canada)",
            "German" : "de-DE",
            "Greek" : "el-GR",
            "Hebrew" : "he-IL",
            "Hindi" : "hi-IN",
            "Italian" : "it-IT",
            "Japanese" : "ja-JP",
            "Korean" : "ko-KR",
            "Mandarin Chinese" : "zh-CN (Simplified)",
            "Norwegian" : "nb-NO",
            "Polish" : "pl-PL",
            "Portuguese" : "pt-PT (Portugal), pt-BR (Brazil)",
            "Russian" : "ru-RU",
            "Spanish" : "es-MX (Mexico), es-ES (Spain)",
            "Swedish" : "sv-SE",
            "Turkish" : "tr-TR"
        }
        await TextToSpeech.speak({
            text: word,
            lang: codes[toLang],
            rate: 1.0,
            pitch: 1.0,
            volume: 1.0,
            category: 'ambient',
            queueStrategy: 1,
        
          });

    }
    useEffect(() => {
        if (!toLang) return;

        const fetchWords = async () => {
   
            console.log("test")
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/words/${toLang}`)
                const data = await response.json()
                console.log("Raw response", data)
                    setLocalWordList(data[0].words)
                    setWordList(data[0].words)
            } catch (error) {
                console.log("Error fetching words", error)
            }
            setLoading(false)
        }

        fetchWords()
    }, [toLang])

    return (
        <div>
            <h2>Flashcards</h2>
            <div>
                <label>language:</label>
                <select value={toLang} onChange={(e) => {
                localSetToLang(e.target.value);
                setToLang(e.target.value); 
                }}>
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

            {!loading && wordList.length === 0 && <p>Loading words...</p>}

            {!loading && wordList.length > 0 && (
                <div className="flashcard-container" >
                {wordList.map((word, index) => (
                    <div key={index} className="flashcard">
                        <h3>{word.word}</h3>
                        <h3>{word.translation}</h3>
                            <button onClick={() => listen(word.word)}>
                                🔊 Listen
                            </button>
                    </div>
                ))}
            </div>  
            )}   
        </div>
    );
};

export default Flashcards;
