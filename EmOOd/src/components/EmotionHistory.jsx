import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore'
import { getStorage,} from 'firebase/storage'

import { useFirebase } from "../context/firebase"
import { getAuth } from 'firebase/auth';

const firestore = getFirestore();
const storage = getStorage();

const EmotionHistory = () => {
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#19BD9D");
    const [emotions, setEmotions] = useState([]);
    const [labels, setLabels] = useState([]);
    const [positiveDataArray, setPositiveDataArray] = useState([]);
    const [negativeDataArray, setNegativedataArray] = useState([]);

    const firebase = useFirebase();
    const firebaseAuth = getAuth();

   const docRef = collection(firestore, `UserData/${firebaseAuth.currentUser}/user-emotions`)

//    const docRef = collection(firestore, `UserData/${firebaseAuth.currentUser}`)



    useEffect(() => {

        getDocs(docRef)
            .then((items) => {
                setLoading(false);
                const emotionData = [];
                const labels = [];
                items.forEach((item) => {
                    let data = item.data();
                    emotionData.push(data);
                    const dateString = data.date.toDate().toString().substring(0, 16);
                    if (!labels.includes(dateString)) {
                        labels.push(dateString);
                    }
                })

                const positiveDataArray = new Array(labels.length).fill(0);
                const negativeDataArray = new Array(labels.length).fill(0);
                items.forEach((item) => {
                    let data = item.data();
                    const dateString = data.date.toDate().toString().substring(0, 16);
                    if (data.emotionType == "Positive") {
                        positiveDataArray[labels.indexOf(dateString)]++;
                    } else {
                        negativeDataArray[labels.indexOf(dateString)]--;
                    }
                });
                setEmotions(emotionData);
                setLabels(labels);
                setPositiveDataArray(positiveDataArray);
                setNegativedataArray(negativeDataArray);
            },
                (err) => {
                    console.log(`Encountered error: ${err}`);
                })
        ;
    }, [positiveDataArray,negativeDataArray])

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Negative Emotions",
                data: negativeDataArray,
                fill: true,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
            },

            {
                label: "Positive Emotions",
                data: positiveDataArray,
                fill: true,
                backgroundColor: "rgb(54, 162, 235)",
                borderColor: "rgb(54, 162, 235, 0.2)",
            },
        ],
    };

    const options = {
        scales: {
            y:
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };

    const checkColor = (color) => {
        if (color == undefined) {
            return "rgb(246, 166, 182)";
        } else return color;
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <div style={{
                width: "600px",
                fontFamily: "Open Sans",
            }}>
                {loading ? (
                    <div >
                        <h5 style={{ marginTop: "10rem", textAlign:"center",  }}>Loading your emotion history</h5>
                    </div>
                ) : (
                    <div>
                        <h5 style={{ marginTop: "10px", textAlign:"center" }}>Your emotion history</h5>

                        <div style={{ maxHeight: "40vh", overflowY: "scroll", marginLeft:"6rem" }}>
                            {emotions.map((item) => {
                                //console.log(`${item} = ${item.color}`);
                                return (
                                    <div
                                        style={{
                                            marginTop: "20px",
                                            padding: "15px",
                                            backgroundColor: `${checkColor(item.color)}`,
                                            color: "#fff",
                                        }}
                                    >
                                        <div>{item.emotion}</div>
                                        <div>
                                            Recorded at{" "}
                                            {`${item.date.toDate().toDateString()} ${item.date
                                                .toDate()
                                                .toLocaleTimeString("en-US")}`}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: "50px", marginLeft:"2.5rem" }}>
                            <Line data={data} options={options} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmotionHistory;