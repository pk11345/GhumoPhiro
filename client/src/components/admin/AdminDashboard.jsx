import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle, FaHome, FaHotel, FaListAlt, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa"
import { ImgFetch, isAdmin } from '../../redux/action'
import BookingList from './BookingList'
import AdminLogout from './AdminLogout'
import ImageUpload from './ImageUpload'
import GetImage from './GetImage'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const admin = useSelector(state => state.admin || {})
  const adminName = admin.name || ""

  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    dispatch(isAdmin())
    dispatch(ImgFetch())
  }, [dispatch])

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          {/* Close Button for Mobile */}
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <FaTimes size={22} />
          </button>
        </div>

        <ul className="space-y-4">
          <li
            onClick={() => {
              setActiveTab("home")
              setSidebarOpen(false)
            }}
            className={`flex items-center gap-2 cursor-pointer p-2 rounded ${
              activeTab === "home" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <FaHome /> Home
          </li>
          <li
            onClick={() => {
              setActiveTab("hotels")
              setSidebarOpen(false)
            }}
            className={`flex items-center gap-2 cursor-pointer p-2 rounded ${
              activeTab === "hotels" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <FaHotel /> Hotels
          </li>
          <li
            onClick={() => {
              setActiveTab("bookings")
              setSidebarOpen(false)
            }}
            className={`flex items-center gap-2 cursor-pointer p-2 rounded ${
              activeTab === "bookings" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <FaListAlt /> Bookings
          </li>
          <li
            onClick={() => {
              setActiveTab("profile")
              setSidebarOpen(false)
            }}
            className={`flex items-center gap-2 cursor-pointer p-2 rounded ${
              activeTab === "profile" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <FaUserCircle /> Profile
          </li>
          <li>
            <AdminLogout/>
              
          </li>
        </ul>
      </div>

      {/* Overlay on Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="flex items-center justify-between bg-gray-100 p-4 shadow-md sticky top-0 z-30">
          {/* Sidebar Toggle */}
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <FaBars size={22} />
          </button>
          <h1 className="text-lg text-black font-bold truncate">
            Welcome, {adminName}
          </h1>
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto flex-1 text-black">
          {activeTab === "home" && (
            <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
          )}

          {activeTab === "hotels" && (
            <div className="space-y-6">
              <ImageUpload />
              <GetImage />
            </div>
          )}

          {activeTab === "bookings" && <BookingList />}

          {activeTab === "profile" && (
            <div className="bg-white p-5 rounded shadow">
              <h2 className="text-2xl font-semibold mb-3">Admin Profile</h2>
              <p className="text-black">Name: {adminName}</p>
              
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
