import { useState } from "react";
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { BASE_URL } from "./App";

const WordPractice = () => {
    const [wordList, setLocalWordList] = useState([]);
    const [toLang, setToLang] = useState("");
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

        const fetchWords = async (e) => {
            let language = e.target.value
            setToLang(language)
            console.log("test")
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/api/words/${language}`)
                const data = await response.json()
                console.log("Raw response", data)
                    setLocalWordList(data[0].words)
                
            } catch (error) {
                console.log("Error fetching words", error)
            }
            setLoading(false)
        }

    return (
        <div>
            <h2>Word Practice</h2>
            <div>
                <label className="wp-label">Language:</label>
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

            {/* {!loading && wordList.length === 0 && <p>Loading words...</p>} */}

            {!loading && wordList.length > 0 && (
                <div className="practice-container" >
                {wordList.map((word, index) => (
                    <div key={index} className="practice">
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

export default WordPractice;
