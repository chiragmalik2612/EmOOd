import {  useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Logout = () => {
    const navigate = useNavigate()

    return (
        useEffect(() => {
            navigate('/')
        })
    )
        
}

export default Logout
