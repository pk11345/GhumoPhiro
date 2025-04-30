import React, { useState } from 'react'
import DatePick from './DatePick'

const UserContent = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  return (
    <>
    <div className='w-full flex flex-col gap-3 p-4 bg-white text-black items-center'>

        <div className='bg-red-400 w-full flex justify-center'>
        <h1>Select Your Journey Date</h1>
        </div>

        <div className='flex flex-col items-center gap-4 bg-red-400 justify-center w-full'>
    <div className='flex flex-col'>
        <h1>Start Date -</h1>
        <DatePick selected={startDate} onChange={(date) => setStartDate(date)}/>
    </div>

    <div className='flex'>
        <h1>End Date -</h1>
        <DatePick selected={endDate} onChange={(date) => setEndDate(date)}/>
    </div>

    </div>

    </div>
    </>
  )
}

export default UserContent