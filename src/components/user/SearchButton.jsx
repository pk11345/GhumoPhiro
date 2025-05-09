import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchButton = () => {
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
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
      >
        Search Hotels
      </button>
      <ToastContainer />
    </div>
  );
};

export default SearchButton;
