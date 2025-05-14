import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImgFetch } from '../../redux/action'

const GetImage = () => {
   
    const img = useSelector(state=>state.img)
    console.log(img)
    const dispatch =useDispatch()

    useEffect(()=>{
    dispatch(ImgFetch())
  },[dispatch])

 


  return (
    <>
  {img.length === 0 ? (
  <p className="text-center text-gray-500">Loading or no images available...</p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
    {
    img.map((hotel, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
        <img src={hotel.img} alt={hotel.hotelName} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 className="text-lg font-semibold text-gray-700">{hotel.hotelName}</h3>
        <p className="text-gray-600">{hotel.hotelDesc}</p>
      </div>
    ))}
  </div>
)}
    </>
  )
}

export default GetImage