import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import {useFirebase} from "../context/firebase"

const RegisterPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(firebase.isLoggedIn) {
            //navigate to home
            navigate('/');
        }
    }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("signing up...")
        const result = await firebase.signupUserWithEmailAndPassword(email, password)
        console.log("Successfull", result);
    };

   // console.log(firebase)

    return(
                <div className="container mt-5" style={{maxWidth: "400px",
                margin: "40px auto",
                padding: "20px",
                background: "#e49944",
                borderRadius: "4px"}}>
                    <h4 className='mb-5'>Sign Up</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email" 
                  placeholder="Enter email" 
                  />
                </Form.Group>
          
                <Form.Group className="mb-3" controlId="formBasicPassword1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password" 
                  placeholder="Password" 
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Create Account
                </Button>
              </Form>
              </div>
            );
          }

export default RegisterPage;