import React from "react";
import "./styling.css";

const WordDefinition = ({ info }) => {
    let brokenDown = {
        word: info[0].word,
        wordType: info[0].meanings[0].partOfSpeech,
        definition: info[0].meanings[0].definitions[0].definition,
    };

    const { word, wordType, definition } = brokenDown;

    return (
        <div className="card">
            <div className="card-text">
                <div
                    className="portada"
                ></div>
                <div className="definition">
                    <div className="title">{wordType}</div>
                    <h2>{word}</h2>
                    <div className="desc">{`"${definition}"`}</div>
                </div>
            </div>
        </div>
    );
};

export default WordDefinition;