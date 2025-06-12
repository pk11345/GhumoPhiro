import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserHotelInfo } from '../../redux/action';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LocationSelector = () => {
  const [location, setLocation] = useState('');
   const [guests, setGuests] = useState(1);
   const [checkInDate, setCheckInDate] = useState(new Date());
     const [checkOutDate, setCheckOutDate] = useState(null);

   const dispatch = useDispatch()
  

  const hotel = useSelector(state=>state.hotels)
  // const Location = hotel.map((t)=>{
  //   return t.hotelLocation
  // })
  const Location = [...new Set(hotel.map(t => t.hotelLocation))];

 console.log(location,"selected Location")

   const handleClick = () => {
     toast.info('🔍 Searching Hotels...', {
       position: 'top-right',
       autoClose: 2000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
     });
     dispatch(UserHotelInfo(checkInDate,checkOutDate,location,guests))
    //  console.log(dispatch(UserHotelInfo(checkInDate,checkOutDate,location,guests)))
   };

  

  return (
    <div className="flex flex-col">
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

      <label className="mb-1 font-medium">Select Location</label>
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">-- Choose a city --</option>
        {Location.map((city) => (
         <option key={city} value={city}>{city}</option>
          ))}

      </select>


      {/* guests */}
       <div className="flex flex-col mt-3">
      <label className="mb-1 font-medium">Guests</label>
      <input
        type="number"
        min={1}
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="No. of guests"
      />
    </div>

    {/* search button */}
      <div className='mt-3'>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white cursor-pointer px-6 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
      >
        Search Hotels
      </button>
      <ToastContainer />
    </div>
    </div>
  );
};

export default LocationSelector;
