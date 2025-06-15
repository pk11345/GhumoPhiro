import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:8000/allBookings', {
          withCredentials: true,
        });
        setBookings(res.data);
        console.log("Bookings:", res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">All Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
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
        ))
      ) : (
        <p className="text-white">No bookings found.</p>
      )}
    </div>
  );
};

export default BookingList;
