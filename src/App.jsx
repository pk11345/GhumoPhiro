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


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
   <>
   <div className='app bg-gray-400/50 min-h-screen bg-cover bg-center bg-no-repeat text-white'
   style={{
    backgroundImage: "url('/texture.jpg')",
  }}
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
    </Routes>
   
   </>
   }
  </div>
   </>
  )
}

export default App