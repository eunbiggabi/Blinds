import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'

const Testimonial = () => {
  return (
    <div>
      <div
        className="flex flex-col items-center px-6 md:px-16 lg:px-24 
        bg-white pt-20 pb-30"
      >
        <Title
          title="What Our Clients Say"
          subTitle="Our clients' 
            Real experiences from homeowners who transformed their spaces with our blinds."
        />

        {/* flex 컨테이너 안에서 map 돌리기 */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-20">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow max-w-xs"
          >
            <div className="flex items-center gap-3">
             
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <StarRating />
            </div>
            <p className="text-gray-500 max-w-90 mt-4">
              "{testimonial.review}"
            </p>
          </div>
        ))}
      </div>
      </div>

      
    </div>
  )
}

export default Testimonial
