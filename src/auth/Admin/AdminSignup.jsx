import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const AdminSignup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const navigate = useNavigate()

    const formData ={
        name:name,
        email:email,
        password:password
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post("http://localhost:8000/AdminSignup", formData,{withCredentials:true})
        .then((res) => {
            console.log("Response:", res.data);
            if (res.status === 201) {
                toast.success("Signup successful!");
                setTimeout(() => {
                    navigate("/AdminLogin");
                }, 2000);
    
                setEmail("");
                setPassword("");
                setName("");
            }
        })
        .catch((err) => {
            console.error("Signup Error:", err.response ? err.response.data : err.message);
            toast.error("Something went wrong. Admin exist.");
        });
    
        
    };
    
    
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

        <button
        className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'
        ><Link to="/AdminLogin">Owner Login</Link>
        </button>
        </div>
        </div>
        </div>

        <div className='flex w-full justify-center items-center md:flex-row flex-col pt-6'>
            <img className='md:w-[300px] md:h-[300px] w-[150px] h-[150px]' 
            src="/owner.png" alt="" />
    <div className='w-[80%] md:w-[60%] flex flex-col items-center justify-center  gap-4'>
        <h1 className='text-2xl font-extrabold'>Owner Signup Form</h1>
        <form className='flex flex-col items-center w-[80%] md:w-[50%] bg-violet-500 gap-5 pt-2 pb-2 shadow-xl shadow-blue-600/50'
        onSubmit={handleSubmit}>

            <label className='text-xl font-semibold' 
             htmlFor="name">Name</label>
            <input className='bg-white pt-1 pb-2 pl-3 w-[60%] text-xl text-black font-semibold outline-none'
             type="text" placeholder='Enter name' value={name} 
            onChange={(e)=>{
                setName(e.target.value)
            }}
            />

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

export default AdminSignup