import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetImage = () => {
    const [img, setImg] = useState([])

    useEffect(()=>{
    const getImg = async ()=>{
        try {
        const response = await axios.get("http://localhost:8000/AdminDashboard",{withCredentials:true})
        console.log(response.data.images)
        setImg(response.data.images||[])
        }
        catch (error){
            console.log("error is :", error )
        }
        
    }
    getImg()
},[])

  return (
    <>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
  {img.map((hotel, index) => (
    <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
      <img src={hotel.img} alt={hotel.hotelName} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-700">{hotel.hotelName}</h3>
      <p className="text-gray-600">{hotel.hotelDesc}</p>
    </div>
  ))}
</div>

    </>
  )
}

export default GetImage