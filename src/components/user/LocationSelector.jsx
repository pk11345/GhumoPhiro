import React, { useState } from 'react';

const LocationSelector = () => {
  const [location, setLocation] = useState('');
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];

  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium">Select Location</label>
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">-- Choose a city --</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
