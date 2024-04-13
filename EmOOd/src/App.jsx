import {Routes, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import LoginPage from "./components/Login"
import RegisterPage from "./components/Signup"
import MyNavbar from "./components/Navbar"
import AddMood from "./components/AddMood"
import AllMoods from "./components/AllMoods"
import HomePage from "./components/HomePage"
import Logout from "./components/Logout"
import EmotionInfo from "./components/EmotionDescription/info"
import EmotionList from "./components/EmotionList"



function App() {

  return (
    <>
      <MyNavbar/>
      <EmotionInfo/>
      <EmotionList/>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/addmood" element={<AddMood/>} />
      <Route path="/allmoods" element={<AllMoods/>} />
      { <Route path="/logout" element={<Logout/>} />}
    </Routes>
      
    </>
  )
}

export default App
