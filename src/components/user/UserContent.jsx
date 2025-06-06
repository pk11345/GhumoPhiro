import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LocationSelector from './LocationSelector';

import HotelCard from './HotelCard';

const UserContent = () => {
 

  return (
    <>
    <div className="w-full mt-4 max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md text-gray-800 space-y-6">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-700">Select Your Journey Dates</h1>
        <p className="text-sm text-gray-500 mt-1">Choose your check-in and check-out dates below</p>
      </div>

      <LocationSelector/>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
      <HotelCard />

      
       </div>

   </>
  );
};

export default UserContent;
