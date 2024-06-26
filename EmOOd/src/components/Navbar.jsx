import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useFirebase } from "../context/firebase"


const MyNavbar = () => {
    const firebase = useFirebase();

    {
        if (firebase.isLoggedIn) {
            return (<Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">EmOOd</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/addmood">Add Mood</Nav.Link>
                        <Nav.Link href="/allmoods">Mood History</Nav.Link>
                        <Nav.Link href="/logout" onClick={firebase.logOut}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>)
        }
        else {
            return (
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="/">EmOOd</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            )
        }
    }

}

export default MyNavbar;