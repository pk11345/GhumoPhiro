import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


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
            }, 2000);
            toast.success("Logged Out")
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <>
    <ToastContainer/>
    <div>
        <button onClick={handleLogout}
        className='cursor-pointer pt-1 pb-2 pl-2 pr-2 border-2 bg-red-500 border-white rounded-2xl 
        text-lg font-semibold hover:bg-red-400'
        >Logout</button>
    </div>
    </>
  )
}

export default UserLogout