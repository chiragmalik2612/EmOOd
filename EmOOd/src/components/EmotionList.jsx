import React, { useState, useContext, useEffect } from 'react'
import EmotionCard from "./EmotionCard";
import EmotionInfo from "./EmotionDescription/info";
import Popup from "./popup";

import { getFirestore, collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

import { useFirebase } from "../context/firebase"
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firestore = getFirestore();
const storage = getStorage();


const EmotionList = () => {

    const [currentEmotionActive, setCurrentEmotionActive] = useState(""); 
    const [popUpEmotion, setpopUpEmotion] = useState(null);
    const [level2Active, setLevel2Active] = useState(false);
    const [color, setColor] = useState();
    const [emotionType, setEmotionType] = useState();
    const [popUp, setpopUp] = useState(false);

    const firebase = useFirebase();
    const firebaseAuth = getAuth()


 const colRef = collection(firestore, `UserData/${firebaseAuth.currentUser}/user-emotions`)

//  const colRef = collection(firestore, `UserData/${firebaseAuth.currentUser}`)


    

    console.log(firebaseAuth.currentUser)


    useEffect(() => {

        onSnapshot(colRef, (items) => {
            items.forEach((item) => {
                let id = item.id;
                let data = item.data()

               // console.log(data)
            })
        },
            (err) => {
                console.log(`Error is : ${err}`)
            }
        )
    })

    // getDocs(colRef)
    // .then((items) => {
    //     items.forEach((item) => {
    //         let data = item.data()

    //         console.log(data)
    //     })
    //    // console.log(items.docs)
    // })


    //simple emotions
    const emotionList = [
        "Surprise",
        "Bad",
        "Afraid",
        "Angry",
        "Disgust",
        "Sad",
        "Happy",
    ];

    //PLACEHOLDER FOR DB -second level of words, depending on what been clicked--it doesn't need to be in the db
    const level2Words = {
        Surprise: ["Shock", "Confusion", "Amazement", "Excitement"],
        Happy: [
            "Playful",
            "Content",
            "Curiosity",
            "Proud",
            "Acceptance",
            "Powerful",
            "Care",
            "Trust",
            "Hope",
        ],
        Sad: ["Lonely", "Vulnerable", "Despair", "Guilty", "Depression", "Hurt"],
        Disgust: ["Disapproval", "Disdain", "Sick", "Repulsion"],
        Angry: [
            "Mistrust",
            "Shame",
            "Jealous",
            "Mad",
            "Irritation",
            "Frustration",
            "Distant",
            "Critical",
        ],
        Bad: ["Boredom", "Busy", "Stress", "Tired"],
        Afraid: ["Scared", "Anxious", "Insecure", "Weak", "Shaky", "Nervous"],
    };

    //colors for all emotions (would be in database)
    const emotionListColor = {
        Surprise: "#8FCDD4",
        Bad: "#DB7558",
        Afraid: "#ACD8CB",
        Angry: "#F6A6B6",
        Disgust: "#FFCF57",
        Sad: "#DA8EC0",
        Happy: "#FFB19B",
    };

    //updating display depending on what word has been clicked
    const updateDisplay = (word) => {
        setCurrentEmotionActive(word);
        setLevel2Active(true);
        setColor(emotionListColor[word]);
        if (word === "Happy") {
            setEmotionType("Positive");
        } else {
            setEmotionType("Negative");
        }
    };


    let level2 = level2Active;
    const renderBackButton = () => {
        if (level2) {
            return (
                <button style={{
                    display: "inline-block",
                    border: "none",
                    padding: "1rem 2rem",
                    margin: "32px",
                    textDecoration: "none",
                    background: "#133072",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    textAlign: "center",
                    fontFamily: "Open Sans",
                }} onClick={() => setLevel2Active(false)}>
                    Go back
                </button>
            );
        }
    };


    const handleSave = () => {
        addDoc(colRef, {
            emotion: `${popUpEmotion}`,
            date: new Date(),
            color,
            emotionType,
        })
    };


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                fontFamily: "Open Sans",
            }}>
                {
                    //conditional if to check if word has been clicked on and update display
                    !level2Active
                        ? emotionList.map((emotion) => {
                            return (
                                <EmotionCard
                                    key={Math.random()}
                                    emotionClicked={updateDisplay}
                                    emotionWord={emotion}
                                    color={emotionListColor[emotion]}
                                />
                            );
                        })
                        : //renders second level of words if level2Words state active
                        level2Words[currentEmotionActive].map((emotion, delay) => {
                            return (
                                <EmotionCard
                                    onClick={() => setpopUp(true)}
                                    key={Math.random()}
                                    emotionClicked={() => {
                                        setpopUp(true);
                                        setpopUpEmotion(emotion);
                                    }}
                                    
                                    emotionWord={emotion}
                                    color={emotionListColor[currentEmotionActive]}
                                />
                            );
                        })
                }
            </div>

            <Popup trigger={popUp} setTrigger={setpopUp}>
                <h3 style={{ textAlign: "center" }}>{`${popUpEmotion}`}</h3>
                <EmotionInfo word={popUpEmotion} />
                {/* button to log emotion into database*/}
                <div style={{ textAlign: "center" }}>
                    <button
                        style={{
                            border: "1px solid black",
                            borderRadius: "5px",
                        }}
                        onClick={() => {
                            handleSave();
                            setpopUp(false);
                        }}
                    >
                        Log Emotion?
                    </button>
                </div>
            </Popup>
            {/*button to go back to previous words*/}
            {renderBackButton()}
        </div>
    )
}


export default EmotionList
