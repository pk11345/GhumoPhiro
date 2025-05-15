import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ImgFetch } from '../../redux/action';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
  const [hotelName, setHotelName] = useState('');
  const [hotelDesc, setHotelDesc] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');

  const dispatch=useDispatch()

  const handleImg = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "pankajmern");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/pankajmern/image/upload",
        formData
      );

      if (res.data.secure_url) {
        setCloudinaryUrl(res.data.secure_url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cloudinaryUrl || !hotelName || !hotelDesc) {
      alert("Please fill all fields and upload image");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/upload-image",
        {
          imageUrl: cloudinaryUrl,
          hotelName,
          hotelDesc,
          hotelLocation
        },
        { withCredentials: true }
      );
      alert("Uploaded successfully");
     
      dispatch(ImgFetch())

      setHotelName('');
      setHotelDesc('');
      setHotelLocation("")
            setCloudinaryUrl(null);
      setPreview(null);
    } catch (err) {
      console.error("Failed to save to server:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Upload Hotel Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleImg}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />

        <input
          type="text"
          placeholder="Hotel Name"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
           focus:ring-blue-400 placeholder:text-black text-black"
        />

        <input
          type="text"
          placeholder="Hotel Description"
          value={hotelDesc}
          onChange={(e) => setHotelDesc(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
           focus:ring-blue-400 placeholder:text-black text-black"
        />

        <input
          type="text"
          placeholder="Hotel Location"
          value={hotelLocation}
          onChange={(e) => setHotelLocation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
           focus:ring-blue-400 placeholder:text-black text-black"
        />


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Submit
        </button>
      </form>

      {preview && (
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">Preview:</p>
          <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
