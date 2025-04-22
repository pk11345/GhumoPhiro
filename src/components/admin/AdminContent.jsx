import React from 'react'
import ImageUpload from './ImageUpload'
import GetImage from './GetImage'

const AdminContent = () => {
  return (
    <>
    <div className='w-full flex justify-center pt-5 pb-3'>
        <h1 className='text-3xl text-black'>Admin Content</h1>
    </div>
    <ImageUpload/>
    <div>
      <GetImage/>
    </div>
    </>
  )
}

export default AdminContent