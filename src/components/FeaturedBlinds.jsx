import React from "react";
import { roomsDummyData } from "../assets/assets";
import BlindsCard from "./BlindsCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const FeaturedBlinds = () => {
  const navigate = useNavigate();

  return (
    <div
      id="our-blinds"
      className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20"
    >
      <Title
        title="Featured Blinds"
        subTitle="Experience the difference of premium quality..."
      />
      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {roomsDummyData.slice(0, 5).map((room, index) => (
          <BlindsCard key={room._id} room={room} />
        ))}

      </div>

      <button
        onClick={() => {
          navigate("/gallery");
          // scrollTo(0, 0);
        }}
        className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
      >
        Go to Gallery
      </button>
    </div>
  );
};

export default FeaturedBlinds;
