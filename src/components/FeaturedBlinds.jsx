import React from "react";
import { Helmet } from "react-helmet"; // ✅ SEO용
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
      {/* ✅ SEO 메타 */}
      <Helmet>
        <title>Featured Blinds | Nice Blinds</title>
        <meta
          name="description"
          content="Explore our featured blinds collection. Premium quality, stylish, and custom-made for your home or office."
        />
        <meta property="og:title" content="Featured Blinds | Nice Blinds" />
        <meta
          property="og:description"
          content="Experience the difference of our premium blinds collection. High-quality blinds with professional installation."
        />
        <meta
          property="og:image"
          content={roomsDummyData[0]?.images[0] || "/assets/og-image.jpg"}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Title
        title="Featured Blinds"
        subTitle="Experience the difference of premium quality..."
      />

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {roomsDummyData.slice(0, 5).map((room) => (
          <BlindsCard key={room._id} room={room} lazyLoad={true} />
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/gallery");
        }}
        className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
      >
        Go to Gallery
      </button>
    </div>
  );
};

export default FeaturedBlinds;
