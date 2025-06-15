import React from 'react'
import ImageUpload from './ImageUpload'
import GetImage from './GetImage'
import BookingList from './BookingList'

const AdminContent = () => {
  return (
    <>
    <div className='w-full flex justify-center pt-5 pb-3'>
        <h1 className='text-3xl text-white'>Admin Content</h1>
    </div>
    <ImageUpload/>
    <div>
      <GetImage/>
    </div>
    <div className="mt-6">
        <BookingList /> 
      </div>
    </>
  )
}

export default AdminContent