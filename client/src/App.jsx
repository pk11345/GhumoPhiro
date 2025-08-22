import React, { useEffect, useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AdminSignup from './auth/Admin/AdminSignup'
import AdminLogin from './auth/Admin/AdminLogin'
import UserSignup from './auth/User/UserSignup'
import UserLogin from './auth/User/UserLogin'
import UserDashboard from './components/user/UserDashboard'
import UserLogout from './components/user/UserLogout'
import AdminDashboard from './components/admin/AdminDashboard'
import Loader from './components/Loader'
import AdminProfile from './components/admin/AdminProfile'
import Bookings from './components/user/Bookings'


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
   <>
   <div className='app  min-h-screen  bg-cover bg-center bg-no-repeat text-white'
  //  style={{
  //   backgroundImage: "url('/texture.jpg')",
  // }}
   >
   {loading ? <Loader /> : 
   <>
    
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/AdminSignup' element={<AdminSignup/>}/>
      <Route path='/AdminLogin' element={<AdminLogin/>}/>
      <Route path='/UserSignup' element={<UserSignup/>}/>
      <Route path='/UserLogin' element={<UserLogin/>}/>
      <Route path='/UserDashboard' element={<UserDashboard/>}/>
      <Route path='/Logout' element={<UserLogout/>}/>
      <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
       <Route path='/AdminProfile' element={<AdminProfile/>}/>
       <Route path='/bookings' element={<Bookings/>}/>

    </Routes>
   
   </>
   }
  </div>
   </>
  )
}

export default App