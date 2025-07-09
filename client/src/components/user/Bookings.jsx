import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bookedHotel, isUser } from '../../redux/action';
import axios from 'axios';
import UserBookings from './UserBookings';

const Bookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hotelId = useSelector(state => state.hotelID);
  const hotels = useSelector(state => state.hotels);
  const userHotelInfo = useSelector(state => state.userHotelInfo);
  const user = useSelector(state => state.user.name);

  const selectedHotel = hotels.find(hotel => hotel._id === hotelId);
  console.log(selectedHotel,"is selected")
  const { checkInDate, checkOutDate, guests } = userHotelInfo[0] || {};

  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState(guests || 1);
  const [checkIn, setCheckIn] = useState(checkInDate ? new Date(checkInDate) : new Date());
  const [checkOut, setCheckOut] = useState(checkOutDate ? new Date(checkOutDate) : null);

  // Fetch user info on refresh
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(isUser());
      setIsLoading(false);
    };
    fetchUser();
  }, [dispatch]);

  // Handle login check
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("⚠️ Login first to access bookings");
      navigate("/UserLogin");
    } else if (user) {
      setIsAllowed(true);
    }
  }, [isLoading, user, navigate]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedHotel) {
      toast.error("No hotel selected for booking");
      return;
    }

    const bookingData = {
      hotelId,
      adminId:selectedHotel.adminId,
      hotelName: selectedHotel.hotelName,
      hotelLocation: selectedHotel.hotelLocation,
     
      fullName,
      email,
      phone,
      guests: guestCount,
      checkIn,
      checkOut
    };

    try {
      const response = await axios.post('http://localhost:8000/bookHotel', bookingData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("✅ Booking Confirmed!");
        dispatch(bookedHotel(response.data));
      } else {
        toast.error("❌ Booking Failed");
      }
    } catch (err) {
      toast.error("❌ Error: " + err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <div className="text-center text-white p-10 text-xl font-semibold">Loading user data...</div>
      ) : isAllowed ? (
        <div className="p-6 max-w-3xl mx-auto text-gray-800 flex flex-col gap-3">
          <div className='flex justify-between'>
            <h1 className='text-white text-2xl font-bold'>My Bookings</h1>
            <button className='bg-red-500 text-white p-2 rounded-2xl text-xl font-bold'>
              <Link to="/UserDashboard">Home</Link>
            </button>
          </div>

          {selectedHotel ? (
            <>
              {/* Hotel Info */}
              <div className="bg-blue-100 rounded-xl shadow-md overflow-hidden mb-6">
                <img
                  src={selectedHotel.img}
                  alt={selectedHotel.hotelName}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-bold text-blue-900">{selectedHotel.hotelName}</h2>
                  <p className="text-gray-700 mt-2">{selectedHotel.hotelDesc}</p>
                  <p className="text-gray-700 mt-1 font-medium">📍 {selectedHotel.hotelLocation}</p>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBooking} className="bg-blue-50 p-6 rounded-xl shadow-md space-y-4">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Booking Details</h3>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />

                <input
                  type="number"
                  min={1}
                  placeholder="Number of Guests"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />

                <div className="flex gap-4 flex-wrap">
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-1">Check-In</label>
                    <DatePicker
                      selected={checkIn}
                      onChange={(date) => {
                        setCheckIn(date);
                        if (checkOut && date > checkOut) setCheckOut(null);
                      }}
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-gray-700 mb-1">Check-Out</label>
                    <DatePicker
                      selected={checkOut}
                      onChange={(date) => setCheckOut(date)}
                      minDate={checkIn}
                      dateFormat="dd/MM/yyyy"
                      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-300 text-gray-900 font-semibold py-2 rounded-lg
                  hover:bg-blue-400 transition cursor-pointer"
                >
                  Confirm Booking
                </button>
              </form>
            </>
          ) : (
            <p className="text-center text-red-400 mt-4">No hotel selected. Please go back and select one.</p>
          )}

          {/* Booking History Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-white mb-4">📘 Your Previous Bookings</h2>
            <UserBookings />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Bookings;
