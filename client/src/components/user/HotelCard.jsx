import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hotelId, HotelId, isFetchingHotels } from "../../redux/action";
import { useNavigate } from "react-router-dom";


const HotelCard = () => {
 

  const hotels = useSelector(state=>state.hotels)
  // console.log(hotels,"ishotels")
  const userHotelInfo = useSelector(state=>state.userHotelInfo)
  console.log(userHotelInfo)

  const dispatch = useDispatch()
  const navigate = useNavigate()

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


 
  const userLocation = userHotelInfo.map((t)=>{
    return t.Location
  })
  // console.log(hotelocation,userLocation,"location")

   const filteredHotels = hotels.filter((hotel) =>
    userLocation.includes(hotel.hotelLocation)
  );

  const hotelID = filteredHotels.map((t)=>{
    return t._id
  })
  console.log(hotelID)

  console.log("Filtered Hotels:", filteredHotels);

  useEffect(()=>{
    dispatch(isFetchingHotels())
  },[dispatch])

  // const bookingInfo =()=>{
  //   dispatch(HotelId(hotelID))
  //   console.log(dispatch(HotelId(hotelID)))
  // }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 ">
      {filteredHotels.map((hotel, index) => (
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
         
          <p className="text-gray-700 text-sm text-center mb-3">
            {hotel.hotelLocation}
          </p>
          
          <button onClick={()=>{
            dispatch(HotelId(hotel._id))
            console.log(dispatch(HotelId(hotel._id)),":id sent")
            navigate("/bookings")
          }}
           className="mt-auto bg-blue-600 hover:bg-blue-700 cursor-pointer
           text-white font-medium py-2 px-4 rounded-md transition duration-200">
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default HotelCard;
