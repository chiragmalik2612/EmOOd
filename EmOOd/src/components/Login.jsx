import React, { useRef, useState } from "react";
import '../index.css'

import { useAuth } from "./Auth";
//import { useHistory } from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    //const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
           // history.push("/")
        } catch {
            setError("Failed to sign in");
        }

        setLoading(false);
    }

    return (
        <form className="login" onSubmit={handleSubmit} >
            <h3>Log In</h3>

            <label>Email address:</label>
            <input
                type="email"
                ref={emailRef}
                required
            />
            <label>Password:</label>
            <input
                type="password"
                ref={emailRef}
                required
            />

            <button disabled={loading}>Log in</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}
