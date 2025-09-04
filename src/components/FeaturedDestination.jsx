import React from 'react'
import { roomsDummyData } from '../assets/assets'
import BlindsCard from './BlindsCard'

const FeaturedDestination = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
            {roomsDummyData.slice(0,5).map((room, index) => (
                <BlindsCard key={room._id} room={room} index={index} />
            ))}
        </div>
    </div>
  )
}

export default FeaturedDestination