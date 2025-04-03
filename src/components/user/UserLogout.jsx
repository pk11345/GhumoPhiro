import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate()
    
    const handleLogout = async ()=>{
        try{
             await axios.get("http://localhost:8000/UserLogout",{withCredentials:true})
            
            let cookie = document.cookie
                cookie= "token="
                // console.log(cookie)
            
            setTimeout(() => {
                navigate("/UserLogin")
            }, 1000);
            alert("Logged Out")
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <>
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
    </>
  )
}

export default UserLogout