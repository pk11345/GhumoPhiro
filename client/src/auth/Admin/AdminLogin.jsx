import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { FaBars, FaTimes } from "react-icons/fa"

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()

  const formData = { email, password }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post("https://ghumophiro.onrender.com/AdminLogin", formData, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Login successful!")
          document.cookie = `token=${res.data.token}`
          setTimeout(() => navigate("/AdminDashboard"), 2000)
        } else {
          toast.error("Admin not exists")
        }
      })
      .catch((err) => {
        console.error("Login Error:", err.response ? err.response.data : err.message)
        toast.error("Something went wrong: Admin Not Found.")
      })

    setEmail("")
    setPassword("")
  }

  return (
    <>
      <ToastContainer />
      {/* Navbar */}
      <div className="w-full bg-gray-400/70 shadow-lg">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl text-blue-500 font-bold italic flex items-center gap-1">
            Ghumo
            <span className="font-extrabold text-white">Phiro</span>
            <img className="w-[35px]" src="/logo.png" alt="logo" />
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4">
            <Link to="/" className="px-3 py-2 border-2 border-white rounded-2xl text-white font-semibold hover:bg-white/20">Home</Link>
            <Link to="/AdminSignup" className="px-3 py-2 border-2 border-white rounded-2xl text-white font-semibold hover:bg-white/20">Owner Signup</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex flex-col md:hidden bg-gray-800 text-white p-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 border border-white rounded-lg hover:bg-white/20"
            >
              Home
            </Link>
            <Link
              to="/AdminSignup"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 border border-white rounded-lg hover:bg-white/20"
            >
              Owner Signup
            </Link>
          </div>
        )}
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col md:flex-row w-full justify-center items-center pt-6 gap-6">
        <div className="bg-white/50 p-2 rounded-full">
          <img
            className="md:w-[300px] md:h-[300px] w-[150px] h-[150px]"
            src="/owner.png"
            alt="owner"
          />
        </div>

        <div className="w-[90%] md:w-[60%] flex flex-col items-center justify-center gap-4 text-black">
          <h1 className="text-2xl font-extrabold">Owner Login Form</h1>
          <form
            className="flex flex-col items-center w-full md:w-[60%] bg-violet-500 gap-5 p-6 rounded shadow-xl shadow-blue-600/50"
            onSubmit={handleSubmit}
          >
            <label className="text-xl font-semibold text-white" htmlFor="email">Email</label>
            <input
              className="bg-white px-3 py-2 w-[80%] text-lg text-black font-medium rounded outline-none"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-xl font-semibold text-white" htmlFor="password">Password</label>
            <input
              className="bg-white px-3 py-2 w-[80%] text-lg text-black font-medium rounded outline-none"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-2 text-lg font-bold rounded-xl hover:bg-red-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminLogin
