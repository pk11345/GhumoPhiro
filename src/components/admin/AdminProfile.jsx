import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminLogout from './AdminLogout';
import axios from 'axios';
import { ImgFetch, isAdmin } from '../../redux/action';
import GetImage from './GetImage';

const AdminProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', password: '' });
  const [editHotel, setEditHotel] = useState(false)

  const admin = useSelector((state) => state.admin);
  const hotel = useSelector(state=>state.img)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAdmin());
    dispatch(ImgFetch())
  }, [dispatch]);

  useEffect(() => {
    if (admin) {
      setForm({ name: admin.name, password: admin.password });
    }
  }, [admin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put('http://localhost:8000/AdminUpdate', form, {
        withCredentials: true,
      });
      alert('Admin updated successfully!');
      setEditMode(false)
      setEditHotel(false)
      dispatch(isAdmin()); // re-fetch updated admin data
    } catch (err) {
      alert('Update failed')
      console.error(err)
    }
  };

  return (
    <>
      <div className="w-full bg-gray-400/70 shadow-2xl shadow-black ">
        <div className="nav w-full flex justify-between pt-3 pb-4 pl-6 pr-6">
          <h1 className="text-2xl text-blue-700 font-bold italic flex ">
            Ghumo<span className="font-extrabold text-white">Phiro</span>
            <span>
              <img className="w-[40px]" src="/logo.png" alt="" />
            </span>
          </h1>
          <div className="flex gap-3">
            <button className="pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg font-semibold hover:bg-white/40">
              <Link to="/AdminDashboard">Home</Link>
            </button>
            <h1 className="pt-1 pb-2 pl-2 pr-2 border-2 border-white rounded-2xl text-lg flex items-center gap-2 text-bold font-semibold hover:bg-white/40 text-white">
              <FaUserCircle className="text-red-500 text-xl cursor-pointer" />
              <Link to="/AdminProfile"> {admin.name}</Link>
            </h1>
            <AdminLogout />
          </div>
        </div>
      </div>

      <div className="w-full mt-4 flex flex-col items-center gap-5">
        <h1 className="text-white text-3xl font-bold">Admin Information</h1>

        <div className="flex flex-col  bg-gray-500 p-10 gap-4 border-2 border-white rounded-2xl">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="p-2 rounded"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="p-2 rounded"
              />
              <div className="flex gap-4">
                <button onClick={handleUpdate} className="bg-green-600 p-2 rounded text-white font-bold">
                  Save
                </button>
                <button onClick={() => setEditMode(false)} className="bg-gray-400 p-2 rounded text-white font-bold">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-3 text-2xl text-white font-semibold">
                <h1>Name:</h1>
                <h1>{admin.name}</h1>
              </div>
              <div className="flex gap-3 text-2xl text-white font-semibold">
                <h1>Password:</h1>
                <h1>{admin.password}</h1>
              </div>
              <button
                className="bg-red-500 p-3 text-xl font-bold text-white rounded-xl cursor-pointer"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>

      <div className='w-full mt-5 p-6'>
        <button onClick={()=>{
          setEditHotel(true)
        }}
         className="bg-red-500 p-3 text-xl font-bold text-white rounded-xl cursor-pointer"
        >Edit Hotels</button>
      </div>

      <div className='w-full flex justify-center pb-4'>
        {editHotel? <>
        {hotel.map((hotel, index) => (
          <div className=' flex gap-4 items-center bg-gray-600 pl-10 pr-10 pt-4 pb-4'
           key={index}>
            <img className='h-20'
             src={hotel.img} alt="" />
            <h1>Name: {hotel.hotelName}</h1>
             <p>Description: {hotel.hotelDesc}</p>
             <button className="bg-red-500 p-2 w-[80px] text-xl font-bold text-white rounded-xl cursor-pointer"
             >Edit</button>
          </div>
           ))}
        </>
        :<>
        </>}
      </div>
    </>
  );
};

export default AdminProfile;
