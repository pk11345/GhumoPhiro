import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

const Bookings = () => {
  const hotelId = useSelector(state => state.hotelID);
  const hotels = useSelector(state => state.hotels);
  const userHotelInfo = useSelector(state => state.userHotelInfo);

  const selectedHotel = hotels.find(hotel => hotel._id === hotelId);
  const { checkInDate, checkOutDate, guests } = userHotelInfo[0] || {};

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState(guests || 1);
  const [checkIn, setCheckIn] = useState(checkInDate ? new Date(checkInDate) : new Date());
  const [checkOut, setCheckOut] = useState(checkOutDate ? new Date(checkOutDate) : null);

  const handleBooking = (e) => {
    e.preventDefault();
    const bookingData = {
      hotelId,
      fullName,
      email,
      phone,
      guests: guestCount,
      checkIn,
      checkOut
    };
    console.log("Booking Info Submitted:", bookingData);
    // axios.post("/api/bookHotel", bookingData)
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800 flex flex-col gap-3">
        <div className='flex justify-between'>
        <h1 className='text-white text-2xl font-bold'>My Bookings</h1>
        <button className='bg-red-500 text-white p-2 rounded-2xl text-xl font-bold'>
            <Link to="/UserDashboard">Home</Link></button>
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
        <p className="text-center text-red-400">No hotel selected. Please go back and select one.</p>
      )}
    </div>
  );
};

export default Bookings;
