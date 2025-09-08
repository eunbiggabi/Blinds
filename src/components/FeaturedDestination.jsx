import React from 'react'
import { roomsDummyData } from '../assets/assets'
import BlindsCard from './BlindsCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom';

const FeaturedDestination = () => {

  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center px-6 md:px-16 
    lg:px-24  bg-slate-50 py-20'>

      <Title title="Featured Blinds" subTitle="Experience the difference of premium 
      quality and innovative design. Our featured blinds are a curated collection 
      of our most exceptional products, combining timeless style with superior
      functionality for your home." />
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
            {roomsDummyData.slice(0,5).map((room, name) => (
                <BlindsCard key={room._id} room={room} name={name}/>
            ))}
        </div>

        <button onClick={() =>{navigate("/gallery"); scrollTo(0,0)}}
        className='my-16 px-4 py-2 text-sm font-medium border 
        border-gray-300 rounded bg-white hover: bg-gray-50 transition-all cursor-pointer'>
          Go to Gallery
        </button>
    </div>
  )
}

export default FeaturedDestination