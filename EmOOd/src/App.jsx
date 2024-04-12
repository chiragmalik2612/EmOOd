import {Routes, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import LoginPage from "./components/Login"
import RegisterPage from "./components/Signup"
import MyNavbar from "./components/Navbar"
import AddMood from "./components/AddMood"
import AllMoods from "./components/AllMoods"
import HomePage from "./components/HomePage"



function App() {

  return (
    <>
      <h1>Hii!!!</h1>
      <MyNavbar/>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/addmood" element={<AddMood/>} />
      <Route path="/allmoods" element={<AllMoods/>} />
    </Routes>
      
    </>
  )
}

export default App
