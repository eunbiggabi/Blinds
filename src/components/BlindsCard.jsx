import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const BlindsCard = ({ room }) => {
  return (
    <Link 
      to={'/blinds/' + room.slug} 
      // onClick={() => window.scrollTo(0, 0)} 
      className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] transition-transform duration-300 transform hover:scale-105 shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-900 group'
    >
      <img src={room.images[0]} alt={room.name} className='' />
    
      <div className="p-4 pt-5">
        <div className="flex items-center justify-center">
           <p className='font-playfair text-xl font-medium text-gray-800 group-hover:text-white'>
             {room.name}
           </p>
        </div>
        <div className="flex items-center justify-between mt-4">
            <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer w-full group-hover:text-white'>
              See More
            </button>
        </div>
      </div>
    </Link>
  )
}

export default BlindsCard
