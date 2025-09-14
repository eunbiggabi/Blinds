import React from "react";
import { Helmet } from "react-helmet"; // ✅ SEO용
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <div>
      {/* ✅ SEO 메타 */}
      <Helmet>
        <title>Client Testimonials | Nice Blinds</title>
        <meta
          name="description"
          content="Hear from our satisfied clients who transformed their homes with our premium custom blinds."
        />
        <meta property="og:title" content="Client Testimonials | Nice Blinds" />
        <meta
          property="og:description"
          content="Real experiences from homeowners and businesses that upgraded their spaces with our blinds."
        />
        <meta
          property="og:image"
          content={testimonials[0]?.image || "/assets/og-image.jpg"}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div
        className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-white pt-20 pb-30"
      >
        <Title
          title="What Our Clients Say"
          subTitle="Our clients' real experiences from homeowners who transformed their spaces with our blinds."
        />

        <div className="flex flex-wrap justify-center items-center gap-6 mt-20">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow max-w-xs"
            >
              <div className="flex items-center gap-3">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} photo`}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                )}
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
  );
};

export default Testimonial;
