import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [newBookings, setNewBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get('https://ghumophiro.onrender.com/myBookings', {
          withCredentials: true,
        });

        const today = new Date();
        const newList = [];
        const previousList = [];

        response.data.forEach((booking) => {
          const checkInDate = new Date(booking.checkIn);
          if (checkInDate >= today.setHours(0, 0, 0, 0)) {
            newList.push(booking);
          } else {
            previousList.push(booking);
          }
        });

        setBookings(response.data);
        setNewBookings(newList);
        setPreviousBookings(previousList);
      } catch (error) {
        console.error("Error fetching user's bookings", error);
      }
    };

    fetchUserBookings();
  }, []);

  const renderBookingCard = (booking, index) => (
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
  );

  return (
    <div className="space-y-8">
      {/* New Bookings */}
      <div>
        <h2 className="text-xl font-bold text-green-400 mb-4">🟢 New Bookings</h2>
        {newBookings.length > 0 ? (
          newBookings.map((booking, index) => renderBookingCard(booking, index))
        ) : (
          <p className="text-white">No upcoming bookings.</p>
        )}
      </div>

      {/* Previous Bookings */}
      <div>
        <h2 className="text-xl font-bold text-red-400 mb-4">🔴 Previous Bookings</h2>
        {previousBookings.length > 0 ? (
          previousBookings.map((booking, index) => renderBookingCard(booking, index))
        ) : (
          <p className="text-white">No past bookings.</p>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
