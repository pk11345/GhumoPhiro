import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/myBookings', {
          withCredentials: true,
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching user's bookings", error);
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <div className="space-y-4">
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 p-4 rounded-xl shadow-md"
          >
            <h3 className="text-blue-700 font-bold text-lg mb-2">Booking #{index + 1}</h3>
            <p><strong>🏨 Hotel:</strong> {booking.hotelName}</p>
            <p><strong>📍 Location:</strong> {booking.hotelLocation}</p>
            <p><strong>👤 Name:</strong> {booking.fullName}</p>
            <p><strong>📧 Email:</strong> {booking.email}</p>
            <p><strong>📞 Phone:</strong> {booking.phone}</p>
            <p><strong>👥 Guests:</strong> {booking.guests}</p>
            <p><strong>🗓️ Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p><strong>🗓️ Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p className="text-white">No previous bookings found.</p>
      )}
    </div>
  );
};

export default UserBookings;
