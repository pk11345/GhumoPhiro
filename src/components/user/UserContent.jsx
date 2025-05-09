import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LocationSelector from './LocationSelector';
import GuestsSelector from './GuestsSelector';
import SearchButton from './SearchButton';
import HotelCard from './HotelCard';

const UserContent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  return (
    <>
    <div className="w-full mt-4 max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md text-gray-800 space-y-6">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-700">Select Your Journey Dates</h1>
        <p className="text-sm text-gray-500 mt-1">Choose your check-in and check-out dates below</p>
      </div>

      {/* Date Picker Cards Row */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        
        {/* Start Date Card */}
        <div className="flex-1 bg-blue-100 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Check-in Date</h2>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (endDate && date > endDate) {
                setEndDate(null);
              }
            }}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* End Date Card */}
        <div className="flex-1 bg-blue-100 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Check-out Date</h2>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            dateFormat="dd/MM/yyyy"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <LocationSelector/>
      <GuestsSelector/>
      <SearchButton/>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
  <HotelCard />
</div>

   </>
  );
};

export default UserContent;
