import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <div className='w-full bg-gray-400/70 shadow-2xl shadow-black '>
    <div className='nav w-full flex justify-between pt-3 pb-4 pl-3 pr-3 md:pl-6 md:pr-6 gap-3 '>
      <h1 className='text-2xl text-blue-700 font-bold italic flex items-center '>Ghumo
        <span className='font-extrabold text-white'>Phiro</span>
        <span><img className='w-[40px]'
        src="/logo.png" alt="" /></span>
        </h1>
    <div className='flex gap-3'>
        {/* <h1>Signup or Login as</h1> */}
        <button 
        className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'>
          <Link to="/AdminDashboard">Owner</Link>
          </button>
        <button 
        className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'>
        <Link to="/UserDashboard">Traveler</Link></button>
    </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard