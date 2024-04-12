import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider, 
    signOut
} from 'firebase/auth'



const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyDMVaDbyb1T25k-6Qe4xt8f2-plUrFpS3k",
    authDomain: "emood-ba455.firebaseapp.com",
    databaseURL: "https://emood-ba455-default-rtdb.firebaseio.com",
    projectId: "emood-ba455",
    storageBucket: "emood-ba455.appspot.com",
    messagingSenderId: "914750262724",
    appId: "1:914750262724:web:c9bedfe7c0362e5da56891"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    const signupUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password)

    const signinUserWithEmailAndPass = (email, password) =>
        signInWithEmailAndPassword(firebaseAuth, email, password)

    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider)

    console.log(user)

    const logOut = () => {
        signOut(firebaseAuth)
        .then(() => {
            console.log("logged out")
        })
        .catch((err) => {
            console.log(err.message)
        })
    }


    const isLoggedIn = user ? true : false

    return (<FirebaseContext.Provider value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        signinWithGoogle,
        logOut,
        isLoggedIn,
    }}>
        {props.children}
    </FirebaseContext.Provider>
    );
}