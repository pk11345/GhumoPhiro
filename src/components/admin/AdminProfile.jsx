import React, { useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AdminLogout from './AdminLogout'
import { isAdmin } from '../../redux/action'

const AdminProfile = () => {

     const admin = useSelector(state=>state.admin)
      console.log(admin,"hello")

      const dispatch=useDispatch()

      useEffect(()=>{
          dispatch(isAdmin())
        },[dispatch])
          
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
            ><Link to="/AdminDashboard">Home</Link>
            </button>
    
           <h1 className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg flex items-center gap-2 text-bold 
                  font-semibold hover:bg-white/40 text-white'>
                   
                 <FaUserCircle className='text-red-500 text-xl cursor-pointer' /> 
                 <Link to="/AdminProfile"> {admin}</Link></h1>
                 <AdminLogout/>
            </div>
            </div>
            </div>
    </>
  )
}

export default AdminProfile