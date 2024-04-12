import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import {useFirebase} from "../context/firebase"

const LoginPage = () => {
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
        console.log("logging in ...")
        const result = await firebase.signinUserWithEmailAndPass(email, password)
        console.log("Successfull", result);
    };

   //console.log(firebase)

    return(
                <div className="container mt-5" style={{maxWidth: "400px",
                    margin: "40px auto",
                    padding: "20px",
                    background: "#e49944",
                    borderRadius: "4px"}}>
                         <h4 className='mb-5'>Log In</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email" 
                  placeholder="Enter email" 
                  />
                </Form.Group>
          
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password" 
                  placeholder="Password" 
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
              <h5 className='mt-3 mb-3' style={{textAlign:"center"}}>OR</h5>
              <Button onClick={firebase.signinWithGoogle} variant='danger' style={{margin:"0 6rem"}}>Sign In with Google</Button>
              </div>
            );
          }

export default LoginPage;