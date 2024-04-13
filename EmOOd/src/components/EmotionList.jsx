import React, { useState, useContext, useEffect } from 'react'
import EmotionCard from "./EmotionCard";
import EmotionInfo from "./EmotionDescription/info";

import { useFirebase } from "../context/firebase"


const EmotionList = () => {
    const firebase = useFirebase();

    const result = firebase.isLoggedIn
    console.log(result)
    console.log(firebase)

    return (
        <div>
        </div>
    )
}

export default EmotionList
