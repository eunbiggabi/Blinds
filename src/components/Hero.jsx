import React, { useState } from "react";
import { Helmet } from "react-helmet"; // ✅ SEO
import PriceCalculator from "./PriceCalculator";
import QuoteModal from "./QuoteModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  const handleOpenModal = (data) => {
    setQuoteData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuoteData(null);
  };

  return (
    <div className='flex flex-col items-start lg:items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroMain.jpg")] bg-no-repeat bg-cover bg-center h-screen relative'>
      
      {/* ✅ SEO 메타태그 */}
      <Helmet>
        <title>Nice Blinds | Custom Blinds in Australia</title>
        <meta
          name="description"
          content="Discover premium custom blinds manufactured locally. Perfect fit for your home or office with professional installation."
        />
        <meta property="og:title" content="Nice Blinds | Custom Blinds" />
        <meta
          property="og:description"
          content="High-quality blinds straight from our workshop. Durable, stylish, and tailored to your needs."
        />
        <meta property="og:image" content="/src/assets/heroMain.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* 반투명 오버레이 (가독성 ↑) */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 max-w-2xl">
        <p className='bg-[#49B9FF]/70 px-3.5 py-1 rounded-full mt-20 inline-block'>
          Custom Blinds, Perfect Fit for Your Home
        </p>
        <h1 className='font-playfair text-3xl md:text-5xl md:text-[56px] md:leading-[56px] font-extrabold mt-4 drop-shadow-lg'>
          Tailored solutions with professional installation.
        </h1>
        <p className='mt-4 text-sm md:text-lg leading-relaxed text-gray-100'>
          We manufacture and distribute a wide range of window coverings for
          domestic and commercial markets here at Nice Blinds. Providing
          high-quality blinds straight from our workshop, you can be sure that
          your purchase will last and look great!
        </p>

        {/* ✅ CTA 버튼 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#49B9FF] text-black font-bold px-8 py-3 rounded-full shadow-lg hover:bg-[#36A6E0] active:bg-[#2A89C0] transition-all duration-300"
          >
            Get a Free Quote
          </button>
        </div>
      </div>

      {/* ✅ 모달 */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quoteData={quoteData}
      />
    </div>
  );
};

export default Hero;
