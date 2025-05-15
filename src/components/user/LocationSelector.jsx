import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LocationSelector = () => {
  const [location, setLocation] = useState('');
   const [guests, setGuests] = useState(1);
  

  const hotel = useSelector(state=>state.hotels)
  const Location = hotel.map((t)=>{
    return t.hotelLocation
  })
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
   };

  return (
    <div className="flex flex-col">
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
