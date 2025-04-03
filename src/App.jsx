import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AdminSignup from './auth/Admin/AdminSignup'
import AdminLogin from './auth/Admin/AdminLogin'
import UserSignup from './auth/User/UserSignup'
import UserLogin from './auth/User/UserLogin'
import UserDashboard from './components/user/UserDashboard'
import UserLogout from './components/user/UserLogout'
import AdminDashboard from './components/admin/AdminDashboard'


const App = () => {
  return (
   <>
   <div className='bg-gray-400/50 min-h-screen'>
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
   </div>
   </>
  )
}

export default App