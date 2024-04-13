import React, { useState, useEffect } from "react";
import "./styling.css";
import WordDefinition from "./definition";


const EmotionInfo = ({ word }) => {
    const [wordInfo, setWordInfo] = useState(null);

    const fetchData = async () => {
        try {
            const result =
                await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}
     `);
            const body = await result.json();
            //console.log(body[0].meanings[0].definitions[0]);
            setWordInfo(body);
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            {wordInfo == null ? (
                console.log("loading")
            ) : (
                <WordDefinition info={wordInfo} />
            )}
        </div>
    );
};

export default EmotionInfo;