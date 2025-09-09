import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import Testimonial from '../components/Testimonial'



const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedDestination />
        {/* <BlindsSimulator /> */}
        <Testimonial />
    </>
  )
}

export default Home