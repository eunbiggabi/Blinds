// src/pages/BlindsDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { roomsDummyData } from "../assets/assets";
import { Helmet } from "react-helmet";

const BlindsDetails = () => {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const foundRoom = roomsDummyData.find((room) => room.slug === slug);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [slug]);

  if (!room) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl font-semibold">The requested blind cannot be found.</p>
      </div>
    );
  }

  const keys = room?.priceOptions ? Object.keys(room.priceOptions) : [];

  return (
    <>
      {/* Helmet SEO */}
      <Helmet>
        <title>{room.name} | Nice Blinds</title>
        <meta name="description" content={room.description} />
        <link rel="canonical" href={`https://www.niceblinds.com.au/blinds/${slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${room.name} | Nice Blinds`} />
        <meta property="og:description" content={room.description} />
        <meta property="og:image" content={room.images[0]} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${room.name} | Nice Blinds`} />
        <meta name="twitter:description" content={room.description} />
        <meta name="twitter:image" content={room.images[0]} />
      </Helmet>

      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-16 xl:px-32">
        {/* 제목 */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">{room.name}</h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            Options
          </p>
          <span className="font-inter text-sm">({keys.join(", ")})</span>
        </div>

        {/* 프로젝트 기간 */}
        <div className="flex items-center gap-1 mt-2">
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-blue-500 rounded-full">
            Project Timeline
          </p>
          <span className="ml-2 font-inter text-sm">{room.projectTimeline}</span>
        </div>

        {/* 이미지 갤러리 */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            {/* ✅ Lazy Loading 적용 */}
            <img
              src={mainImage}
              alt={room.name}
              className="w-full rounded-xl shadow-lg object-cover"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${room.name} ${index + 1}`}
                  onClick={() => setMainImage(image)}
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImage === image ? "outline-4 outline-orange-500" : ""
                  }`}
                  loading="lazy"
                />
              ))}
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>{room.description}</p>
          {room.trend !== "others" && (
            <p className="mt-3 text-l md:text-xl">Trend: {room.trend}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlindsDetails;
