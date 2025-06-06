import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isFetchingHotels } from "../../redux/action";

const HotelCard = () => {
  // const [hotels, setHotels] = useState([]);

  const hotels = useSelector(state=>state.hotels)
  // console.log(hotels,"ishotels")

  const dispatch = useDispatch()

  // useEffect(() => {
  //   const fetchHotels = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8000/getHotels", {
  //         withCredentials: true,
  //       });
  //       setHotels(res.data);
  //     } catch (err) {
  //       console.error("Error fetching hotels:", err);
  //     }
  //   };

  //   fetchHotels();
  // }, []);

  useEffect(()=>{
    dispatch(isFetchingHotels())
  },[dispatch])

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 ">
      {hotels.map((hotel, index) => (
        <div
          key={index}
          className="flex flex-col items-center w-72 border rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300 bg-blue-50"
        >
          <img
            src={hotel.img}
            alt={hotel.hotelName}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h2 className="text-lg font-semibold text-blue-800 mb-1">
            {hotel.hotelName}
          </h2>
          <p className="text-gray-700 text-sm text-center mb-3">
            {hotel.hotelDesc}
          </p>
          <h1>{hotel._id} hello</h1>
          <p className="text-gray-700 text-sm text-center mb-3">
            {hotel.hotelLocation}
          </p>
          <button className="mt-auto bg-blue-600 hover:bg-blue-700 cursor-pointer
           text-white font-medium py-2 px-4 rounded-md transition duration-200">
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default HotelCard;
