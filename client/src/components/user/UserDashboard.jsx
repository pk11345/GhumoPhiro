import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UserLogout from './UserLogout'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { FaUserCircle } from "react-icons/fa";
import UserContent from './UserContent';
import { useDispatch, useSelector } from 'react-redux';
import { isUser } from '../../redux/action';


const UserDashboard = () => {
  // const [user, setUser] = useState("")
  // const [role, setRole] = useState("")
  const navigate = useNavigate()

    const user = useSelector(state=>state.user.name)
      console.log(user, "this is this is")

       const dispatch = useDispatch()

        useEffect(()=>{
           dispatch(isUser())
         },[dispatch])

         
       useEffect(() => {
       const timer = setTimeout(() => {
        if (!user) {
          toast.error("⚠️ You must be logged in to view this page");
        }
        }, 2000);

        return () => clearTimeout(timer);
       }, [user]);

//   useEffect(()=>{

//   let info = async ()=>{
//     try{
//     let response = await axios.get("http://localhost:8000/UserDashboard",{withCredentials:true})
//     console.log(response.data)
    
//     setUser(response.data.name)
//     setRole(response.data.role)
//     // console.log(role)
//     }
//     catch(err){
//       console.log(err)
//       if (err.response && err.response.status === 401) {
//         // toast.error("You have to login first");
//         // setTimeout(() => navigate("/UserLogin"), 2000); 
//       } 
//     }
//   }
//   info()
// },[navigate])
  

  return (
    <>
    <ToastContainer/>
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
      ><Link to="/">Home</Link>
      </button>

      {!user? <>
        <button
          className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'
          ><Link to="/UserLogin">Traveler Login</Link>
          </button>

          <button
          className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'
          ><Link to="/UserSignup">Traveler Signup</Link>
          </button>
      </> :
      <>
      <h1 className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg flex items-center gap-2 text-bold 
             font-semibold hover:bg-white/40 text-white'>
            <FaUserCircle className='text-red-500 text-xl' /> {user}</h1>
             <button className='bg-red-500 text-white p-2 rounded-2xl text-xl font-bold border-2 border-white'>
                        <Link to="/bookings">My Bookings</Link></button>
      <UserLogout/> 
      </>
      }
         
        
          </div>
          </div>
          </div>

          
           <UserContent/>
          
         
   
    </>
  )
}

export default UserDashboard