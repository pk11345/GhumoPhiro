import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminLogout from './AdminLogout'
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import AdminContent from './AdminContent';

const AdminDashboard = () => {
    const [admin, setAdmin] = useState("")
  
    const navigate = useNavigate()
  
  
    useEffect(()=>{
  
    let info = async ()=>{
      try{
      let response = await axios.get("http://localhost:8000/AdminDashboard",{withCredentials:true})
      console.log(response.data)
      setAdmin(response.data.name)
      }
      catch(err){
        console.log(err)
        if (err.response && err.response.status === 401) {
          // toast.error("You have to login first");
          // setTimeout(() => navigate("/AdminLogin"), 2000); 
        } 
      }
    }
    info()
  },[navigate])
    

 
  
    return (
      <>
      <ToastContainer autoClose={2000}/>
       <div className='w-full bg-gray-400/70 shadow-2xl shadow-black '>
          <div className='nav w-full flex justify-between pt-3 pb-4 pl-6 pr-6'>
            <h1 className='text-2xl text-blue-700 font-bold italic flex '>Ghumo
              <span className='font-extrabold text-white'>Phiro</span>
              <span><img className='w-[40px]'
              src="/logo.png" alt="" /></span>
              </h1>
          <div className='flex gap-3'>
          
      <button 
      className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'
      ><Link to="/AdminDashboard">Home</Link>
      </button>
      {!admin?
      <>
      <button
          className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'
          ><Link to="/AdminLogin">Owner Login</Link>
          </button>

          <button
          className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'
          ><Link to="/AdminSignup">Owner Signup</Link>
          </button>
      </>  : 
      <>
      <h1 className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg flex items-center gap-2 text-bold 
       font-semibold hover:bg-white/40 text-white'>
      <FaUserCircle className='text-red-500 text-xl' /> {admin}</h1>
      <AdminLogout/>
      </>
      }
          
  
      
          </div>
          </div>
          </div>


        
          

          <div>
            {
              !admin? 
              <>
                <div className='flex flex-col items-center  pt-6'>
            <h1 className='text-4xl font-bold italic text-yellow-800'>Want To List Your Property With Us?</h1>
            <h2 className='text-2xl font-semibold text-black'>Register Or Login To Get Partenered With Us</h2>
          </div>

              </>  
              : <>
              <AdminContent/>
              </>
            }
          </div>
   
      </>
    )
}

export default AdminDashboard