import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { isAdmin } from '../../redux/action';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [newBookings, setNewBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  
  const dispatch = useDispatch()

  const adminId = useSelector((state)=>state.admin.adminId)
  console.log(adminId)

  useEffect(() => {
  dispatch(isAdmin());
}, [dispatch]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('https://ghumophiro.onrender.com/allBookings', {
          withCredentials: true,
        });
        
           console.log(res.data,"this is") 

        const today = new Date();
        const newList = [];
        const previousList = [];

        res.data.forEach((booking) => {
          
           if (booking.adminId?.toString() == adminId.toString()) {
          const checkInDate = new Date(booking.checkIn);
          if (checkInDate >= today.setHours(0, 0, 0, 0)) {
            newList.push(booking);
          } else {
            previousList.push(booking);
          }
        }
        });
        
        
        setBookings(res.data);
        setNewBookings(newList);
        setPreviousBookings(previousList);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
    // dispatch(isAdmin())
  }, [adminId]);

 

  const renderBookingCard = (booking, index) => (
    <div key={index} className="bg-white rounded-xl shadow-lg p-4 mb-4 text-gray-800">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">Booking #{index + 1}</h3>
      <div className="mb-3">
        <p><strong>Hotel Name:</strong> {booking.hotelName || "N/A"}</p>
        <p><strong>Location:</strong> {booking.hotelLocation || "N/A"}</p>
      </div>
      <div>
        <p><strong>Full Name:</strong> {booking.fullName}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Phone:</strong> {booking.phone}</p>
        <p><strong>Guests:</strong> {booking.guests}</p>
        <p><strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
        <p><strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
      </div>
    </div>
  );

  return (
   <div className="p-4">
  <h2 className="text-3xl font-bold text-black mb-6">📋 All Bookings</h2>

  {newBookings.length === 0 && previousBookings.length === 0 ? (
    <p className='text-red-600'>NO bookings</p>
  ) : (
    <>
      {/* New Bookings */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-green-400 mb-4">🟢 New Bookings</h3>
        {newBookings.length > 0 ? (
          newBookings.map((booking, index) => renderBookingCard(booking, index))
        ) : (
          <p className="text-white">No upcoming bookings.</p>
        )}
      </div>

      {/* Previous Bookings */}
      <div>
        <h3 className="text-2xl font-bold text-red-400 mb-4">🔴 Previous Bookings</h3>
        {previousBookings.length > 0 ? (
          previousBookings.map((booking, index) => renderBookingCard(booking, index))
        ) : (
          <p className="text-white">No past bookings.</p>
        )}
      </div>
    </>
  )}
</div>

  );
};

export default BookingList;
