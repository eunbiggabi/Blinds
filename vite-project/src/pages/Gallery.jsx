// src/components/BlindsGallery.jsx
import React, { useState, useEffect } from "react";
import { galleryImages } from "../assets/gallery/gallery";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Title from "../components/Title";
import { Helmet } from "react-helmet";

// 필터 목록
const FILTERS = [
  { key: "all", label: "All" },
  { key: "roller", label: "Roller" },
  { key: "vertical", label: "Vertical" },
  { key: "venetian", label: "Venetian" },
  { key: "panel", label: "Panel" },
  { key: "curtain", label: "Curtain" },
  { key: "shutter", label: "Shutter" },
  { key: "awning", label: "Awning" },
];

// 배열 무작위 섞기
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const BlindsGallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredImages, setFilteredImages] = useState(
    shuffleArray(Object.values(galleryImages).flat())
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // 필터 바뀔 때마다 랜덤 정렬
  useEffect(() => {
    const images =
      activeFilter === "all"
        ? Object.values(galleryImages).flat()
        : galleryImages[activeFilter] || [];
    setFilteredImages(shuffleArray(images));
  }, [activeFilter]);

  return (
    <>
      {/* Helmet + SEO 최적화 */}
      <Helmet>
        <title>Blinds Gallery | Nice Blinds</title>
        <meta
          name="description"
          content="Find the perfect blinds to suit your home. Explore our gallery of high-quality, custom-made blinds."
        />
        <link rel="canonical" href="https://www.niceblinds.com.au/blinds-gallery" />

        {/* Open Graph */}
        <meta property="og:title" content="Blinds Gallery | Nice Blinds" />
        <meta
          property="og:description"
          content="Discover our premium blinds collection, designed to enhance your home."
        />
        <meta property="og:image" content="/assets/gallery-og.webp" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blinds Gallery | Nice Blinds" />
        <meta
          name="twitter:description"
          content="Find the perfect blinds to suit your home. Explore our gallery of high-quality, custom-made blinds."
        />
        <meta name="twitter:image" content="/assets/gallery-og.webp" />
      </Helmet>

      <div className="w-full max-w-7xl mx-auto px-4 py-20 pt-30 pb-10">
        <div className="py-10">
          <Title
            title="Blinds Gallery"
            subTitle="Find the perfect blinds to suit your home"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTERS.map((f) => (
            <motion.button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${
                activeFilter === f.key
                  ? "bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl group cursor-pointer"
                onClick={() => {
                  setLightboxIndex(idx);
                  setLightboxOpen(true);
                }}
              >
                {/* Lazy Loading 유지 + 의미 있는 alt */}
                <img
                  src={img}
                  alt={`Gallery image of ${activeFilter} blinds`}
                  className="w-full h-72 object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold capitalize tracking-wide">
                    {activeFilter === "all" ? "NiceBlinds" : activeFilter}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={filteredImages.map((src) => ({ src }))}
        />
      </div>
    </>
  );
};

export default BlindsGallery;
