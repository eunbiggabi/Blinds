// src/components/RoomGuide.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { galleryImages } from "../assets/gallery/gallery";
import Title from "../components/Title";
import { Helmet } from "react-helmet";

// Room guides data (English)
const roomGuides = [
  {
    key: "bedroom",
    title: "Bedroom",
    description: `
      The bedroom is your personal sanctuary, where comfort and relaxation come first. Privacy and light control are essential.
      Consider using blackout roller blinds or thick curtains to block morning sunlight, ensuring a restful sleep.
      Neutral tones and soft textures can create a calm, cozy atmosphere.
    `,
    image: galleryImages.roller[7],
  },
  {
    key: "living",
    title: "Living Room",
    description: `
      The living room is the heart of the home, perfect for gatherings and entertaining guests.
      Vertical or curtain blinds allow natural light while maintaining privacy. 
      They also enhance the room's style and add a modern, elegant touch to your interior.
    `,
    image: galleryImages.curtain[0],
  },
  {
    key: "kitchen",
    title: "Kitchen",
    description: `
      The kitchen needs blinds that are easy to clean and resistant to moisture.
      Roller or Venetian blinds made from water-resistant materials are ideal.
      They are practical, durable, and help maintain a stylish kitchen.
    `,
    image: galleryImages.venetian[0],
  },
  {
    key: "office",
    title: "Office",
    description: `
      Office spaces require blinds that reduce glare and provide a professional atmosphere.
      Vertical or roller blinds are perfect for maintaining focus while keeping the room tidy.
      Choose neutral colors to complement your workspace décor.
    `,
    image: galleryImages.vertical[1],
  },
  {
    key: "commercial",
    title: "Commercial Space",
    description: `
      Commercial spaces should balance style and functionality.
      Panel blinds on large windows offer a modern and upscale look.
      They enhance interior design and create a professional impression for clients and visitors.
    `,
    image: galleryImages.panel[0],
  },
  {
    key: "rental",
    title: "Rental House",
    description: `
      Rental homes need cost-effective, versatile blinds.
      Roller blinds are easy to install, maintain, and suit most interior styles.
      They provide privacy and light control without breaking the budget.
    `,
    image: galleryImages.roller[1],
  },
];

const RoomGuide = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-20 pt-30">
      {/* Helmet SEO */}
      <Helmet>
        <title>Room Guide | Nice Blinds</title>
        <meta
          name="description"
          content="Explore our Room Guide to find the recommended blinds for each room in your home."
        />
        <link rel="canonical" href="https://www.niceblinds.com.au/room-guide" />

        {/* Open Graph */}
        <meta property="og:title" content="Room Guide | Nice Blinds" />
        <meta
          property="og:description"
          content="Discover the perfect blinds for bedrooms, living rooms, kitchens, offices, and more."
        />
        <meta property="og:image" content="/assets/roomguide-og.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.niceblinds.com.au/room-guide" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Room Guide | Nice Blinds" />
        <meta
          name="twitter:description"
          content="Explore our Room Guide to find the recommended blinds for each room in your home."
        />
        <meta name="twitter:image" content="/assets/roomguide-og.webp" />
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-12">
        <Title title="Room Guide" subTitle="Recommended Blinds by Room" />
      </h2>

      {/* Room Cards */}
      <div className="flex flex-col gap-8">
        {roomGuides.map((room) => (
          <motion.div
            key={room.key}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedRoom(room)}
          >
            <h3 className="text-2xl mb-4">{room.title}</h3>
            {room.image && (
              <img
                src={room.image}
                alt={`${room.title} blinds`}
                className="w-full h-64 object-cover rounded-lg mb-4"
                loading="lazy"
              />
            )}
            <p className="text-gray-700 whitespace-pre-line">{room.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X size={28} />
              </button>
              <h3 className="text-2xl font-bold mb-4">{selectedRoom.title}</h3>
              {selectedRoom.image && (
                <img
                  src={selectedRoom.image}
                  alt={`${selectedRoom.title} blinds`}
                  className="w-full h-72 object-cover rounded-lg mb-6"
                  loading="lazy"
                />
              )}
              <p className="text-gray-700 whitespace-pre-line">{selectedRoom.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomGuide;
