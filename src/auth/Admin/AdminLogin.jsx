import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const formData ={
        email:email,
        password:password
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        
       axios.post("http://localhost:8000/AdminLogin", formData,{withCredentials:true})
       .then((res) => {
           console.log("Response:", res.data);
           if (res.status === 200) {
               alert("Login successful!");
               let cookie = document.cookie
               cookie= `token=${res.data.token}`
            //    console.log(cookie)
               navigate("/AdminDashboard")
           } else if (res.status === 400) {
               alert("Admin not exists");
           }
       })
       .catch((err) => {
           console.error("Login Error:", err.response ? err.response.data : err.message);
           alert("Something went wrong:Admin Not Found.");
       });
   
        setEmail("")
        setPassword("")
        
       //  console.log(formData)
    }
  return (
    <>
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
    
            <button
            className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'
            ><Link to="/AdminSignup">Owner Signup</Link>
            </button>
            </div>
            </div>
            </div>

            {/* form */}
        <div className='flex w-full justify-center items-center pt-6 md:flex-row flex-col'>
            <img className='md:w-[300px] md:h-[300px] w-[150px] h-[150px]' 
            src="/owner.png" alt="" />

    <div className='w-[80%] md:w-[60%] flex flex-col items-center justify-center  gap-4 '>
       <h1 className='text-2xl font-extrabold'>Owner Login Form</h1>
        <form className='flex flex-col items-center w-[80%] md:w-[50%]  bg-violet-500 gap-5 pt-2 pb-2 shadow-xl shadow-blue-600/50'
         onSubmit={handleSubmit}>
           
           <label className='text-xl font-semibold'
             htmlFor="email">Email</label>
            <input className='bg-white pt-1 pb-2 pl-3 w-[60%] text-xl text-black font-semibold outline-none'
             type="email" placeholder='Enter email'  value={email} 
            onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            
            <label className='text-xl font-semibold'
             htmlFor="password">Password</label>
            <input className='bg-white pt-1 pb-2 pl-3 w-[60%] text-xl text-black font-semibold outline-none'
             type="password" placeholder='Enter password'  value={password} 
            onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <input className='bg-red-500 text-white p-3 text-lg font-bold rounded-xl cursor-pointer'
             type="submit" placeholder='Submit' />
        </form>
    </div>
    </div>
    </>
  )
}

export default AdminLogin