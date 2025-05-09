import React, { useState } from 'react';

const GuestsSelector = () => {
  const [guests, setGuests] = useState(1);

  return (
    <div className="flex flex-col">
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
  );
};

export default GuestsSelector;
