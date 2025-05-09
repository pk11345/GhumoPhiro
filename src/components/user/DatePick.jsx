import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePick = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(null);

  return (
    <div className="w-full flex justify-center items-start gap-6 p-8 bg-gray-50 rounded-xl shadow-md">
      
      {/* Check-in Card */}
      <div className="w-1/3 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Check-in</h3>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => {
            setCheckInDate(date);
            if (checkOutDate && date > checkOutDate) {
              setCheckOutDate(null);
            }
          }}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Check-out Card */}
      <div className="w-1/3 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Check-out</h3>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          minDate={checkInDate}
          dateFormat="dd/MM/yyyy"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default DatePick;
