import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminLogout from './AdminLogout';
import axios from 'axios';
import { ImgFetch, isAdmin } from '../../redux/action';


const AdminProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', password: '' });
  // const [editHotel, setEditHotel] = useState({images:[{}] });
  const [selectedHotel, setselectedHotel] = useState(null)
  const [img, setImg] = useState(null)
  const [hotelName, sethotelName] = useState("")
  const [hotelDesc, sethotelDesc] = useState("")
  const [openHotel, setOpenHotel] = useState(false)
  const [hotelForm, setHotelForm] = useState(false)
  const [hotelLocation, setHotelLocation] = useState('');
  

  const admin = useSelector((state) => state.admin);
  const hotel = useSelector(state=>state.img)
  const dispatch = useDispatch();

  // setEditHotel({images:[{
  //   img:img,
  //   hotelName:hotelName,
  //   hotelDesc:hotelDesc
  // }]})

  useEffect(() => {
    dispatch(isAdmin());
    dispatch(ImgFetch())
  }, [dispatch]);

  useEffect(() => {
    if (admin) {
    setForm({ name: admin.name, password: admin.password,});
    // setEditHotel({ images:[{img:admin.images.img, hotelName:admin.images.hotelName, hotelDesc:admin.images.hotelDesc}] })
    }
  }, [admin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put('https://ghumophiro.onrender.com/AdminUpdate', form, {
        withCredentials: true,
      });
      alert('Admin updated successfully!');
      setEditMode(false)
      
      dispatch(isAdmin()); // re-fetch updated admin data
    } catch (err) {
      alert('Update failed')
      console.error(err)
    }
  };

  const handleHotelUpdate = async ()=>{
    try{
      const res = await axios.put(`http://localhost:8000/updateHotel/${selectedHotel}`, {
    hotelName,
    hotelDesc,
    hotelLocation
  },
        {withCredentials:true})

        alert("Hotel updated")
        setOpenHotel(false)
    }
    catch(err){
      alert("update hotel failed")
      console.log(err)
    }
  }
console.log(selectedHotel)


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
                // value={form.name}
                onChange={handleChange}
                placeholder="Enter new name"
                className="p-2 rounded"
              />

              <input
                type="password"
                name="password"
                // value={form.password}
                onChange={handleChange}
                placeholder="Enter new password"
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
               <div className="flex gap-3 text-2xl text-white font-semibold">
                <h1>Email:</h1>
                <h1>{admin.email}</h1>
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
          

          {/* edit hotel  */}
      <div className='w-full mt-5 p-6 flex justify-between'>
        <button onClick={()=>{
          setOpenHotel(true)
        }}
         className="bg-red-500 p-3 text-xl font-bold text-white rounded-xl cursor-pointer"
        >Edit Hotels</button>
        {openHotel? 
         <button onClick={()=>{
          setOpenHotel(false)
        }}
         className="bg-red-500 p-3 text-xl font-bold text-white rounded-xl cursor-pointer"
        >Close</button> :<></>}
      </div>


      <div className='w-full flex flex-col items-center gap-3 '>
        {openHotel? <>
        {hotel.map((hotel, index) => (
          <div className=' flex gap-4 items-center justify-between bg-gray-600 pl-4 pr-4 pt-4 pb-4 w-[70%]'
           key={index}>
            <img className='h-20'
             src={hotel.img} alt="" />
            <h1>Name: {hotel.hotelName}</h1>
             <p>Description: {hotel.hotelDesc}</p>
             <p>Location: {hotel.hotelLocation}</p>

             <button onClick={()=>{
              setHotelForm(true)
              setselectedHotel(hotel._id)
              
             }}
             className="bg-red-500 p-2 w-[80px] text-xl font-bold text-white rounded-xl cursor-pointer "
             >Edit</button>
          </div>
           ))}
        </>
        :<>
        </>}

          {/* hotel edit form */}
        { hotelForm?
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 absolute top-50">
          <div className='flex w-full justify-between items-center'>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Upload Hotel Image</h2>
      <button onClick={()=>{
        setHotelForm(false)
      }}
      className='bg-red-500 text-white w-[30px] rounded-[50%] cursor-pointer'>
        X</button> </div>
      <form  className="space-y-4">
        <input
          type="file"
          // onChange={handleImg}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />

        <input
          type="text"
          placeholder="Hotel Name"
          onChange={(e)=>{
            sethotelName(e.target.value)
          }}
          value={hotelName}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
           focus:ring-blue-400 placeholder:text-black text-black"
        />

        <input
          type="text"
          placeholder="Hotel Description"
          onChange={(e)=>{
            sethotelDesc(e.target.value)
          }}
          value={hotelDesc}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
           focus:ring-blue-400 placeholder:text-black text-black"
        />
         <input
          type="text"
          placeholder="Hotel Location"
          value={hotelLocation}
          onChange={(e) => setHotelLocation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
           focus:ring-blue-400 placeholder:text-black text-black"
        />


        <button onClick={handleHotelUpdate}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>  : <></> }
      </div>
    </>
  );
};

export default AdminProfile;
