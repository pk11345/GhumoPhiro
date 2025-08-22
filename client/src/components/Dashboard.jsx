import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HomeContent from './HomeContent'
import { FaBars, FaTimes } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

const Dashboard = () => {

   const [showBox, setShowBox] = useState(false)
     const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
    <div className='w-full bg-gray-400/70 shadow-2xl shadow-black sticky top-0 z-99'>
    <div className='nav w-full flex justify-between pt-3 pb-4 pl-3 pr-3 md:pl-6 md:pr-6 gap-3 '>
      <h1 className='text-2xl text-blue-600 font-bold italic flex items-center'>Ghumo
        <span className='font-extrabold text-white'>Phiro</span>
        <span><img className='w-[40px]'
        src="/logo.png" alt="" /></span>
        </h1>
    <div className='flex gap-3 items-center'>
        {/* <h1>Signup or Login as</h1> */}
        <ul className='hidden md:flex text-xl gap-4 items-center cursor-pointer '>
          <li className='hover:bg-black/20 p-2 rounded-xl'>Home</li>
          <li className='hover:bg-black/20 p-2 rounded-xl'>Explore</li>
          <li className='hover:bg-black/20 p-2 rounded-xl'>About</li>
          <li className='hover:bg-black/20 p-2 rounded-xl'>Help</li>
          <li>
            <button className='bg-blue-400 p-2 rounded-xl cursor-pointer hover:bg-blue-300 '
            onClick={() => setShowBox(!showBox)}
            >
              Login/Signup
            </button>
          </li>
        </ul>
        {/* <button 
        className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'>
          <Link to="/AdminDashboard">Owner</Link>
          </button>
        <button 
        className='pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40'>
        <Link to="/UserDashboard">Traveler</Link></button> */}

         {/* Mobile Hamburger */}
          <button 
            className='md:hidden text-3xl text-white'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

         {showBox && (
              <div className="absolute top-14 right-0 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3 w-[200px] z-50">
                 {/* Cross button */}
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                  onClick={() => setShowBox(false)}
                >
                  <AiOutlineClose size={20} />
                </button>
                
                <h2 className="text-lg font-semibold text-gray-700">Continue as</h2>
                <Link 
                  to="/AdminDashboard" 
                  className="bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600"
                  onClick={() => setShowBox(false)}
                >
                  Owner
                </Link>
                <Link 
                  to="/UserDashboard" 
                  className="bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600"
                  onClick={() => setShowBox(false)}
                >
                  Traveller
                </Link>
              </div>
     )}
    </div>
    
   
    </div>
                        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className='md:hidden flex flex-col gap-4 bg-gray-700 text-white text-lg p-5'>
            <span className='hover:bg-black/30 p-2 rounded-xl'>Home</span>
            <span className='hover:bg-black/30 p-2 rounded-xl'>Explore</span>
            <span className='hover:bg-black/30 p-2 rounded-xl'>About</span>
            <span className='hover:bg-black/30 p-2 rounded-xl'>Help</span>
            <button
              className='bg-blue-400 p-2 rounded-xl cursor-pointer hover:bg-blue-300'
              onClick={() => {
                setShowBox(true)
                setMenuOpen(false)
              }}
            >
              Login/Signup
            </button>
          </div>
        )}
    </div>
    <HomeContent/>
    </>
  )
}

export default Dashboard