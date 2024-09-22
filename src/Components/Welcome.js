import React from 'react'
import Logo from '../images/live-chat.png'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const userData = JSON.parse(localStorage.getItem("userData"))
  const navigate = useNavigate()
  console.log(userData)
  if(!userData){
    console.log("User not authorized")
    navigate("/")
  }
  return (
    <div className='welcomeContainer'>
        <img src={Logo} alt="Live Chat" className='welcomeLogo'/>
        <p > View and text directly to people present in the chat rooms.</p>
    </div>
  )
}

export default Welcome