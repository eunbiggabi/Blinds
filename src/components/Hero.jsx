import React, { useState } from "react";
import { Helmet } from "react-helmet";
import QuoteModal from "./QuoteModal";
import Title from "./Title";

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
      {/* Semi-transparent Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Nice Blinds | Custom Blinds in Australia</title>
        <meta
          name="description"
          content="Nice Blinds manufactures and installs custom blinds in Brisbane. Discover premium blinds for your home or office with a perfect fit."
        />
        <meta
          name="keywords"
          content="Brisbane blinds, custom blinds, curtains, roller blinds, vertical blinds, Venetian blinds, window coverings, blind installation, Nice Blinds"
        />
        <meta property="og:title" content="Nice Blinds | Custom Blinds Brisbane" />
        <meta
          property="og:description"
          content="High-quality custom blinds directly from Nice Blinds workshop. The best choice in Brisbane for durable and stylish window solutions!"
        />
        <meta property="og:image" content="/src/assets/heroMain.jpg" />
        <meta property="og:url" content="https://www.niceblinds.com.au" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.niceblinds.com.au" />
      </Helmet>

      <div className="relative z-10 max-w-2xl text-center lg:text-center">
        <div className="">
          {/* Title with New Linear Gradient Color */}
          <Title
            title={
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#49B9FF] via-[#FF7E5F] to-[#FEB47B] drop-shadow-lg">
                "The Local Choice for Blinds in Brisbane"
              </span>
            }
          />
        </div>
        <p className='bg-[#49B9FF]/70 px-3.5 py-1 rounded-full mt-6 inline-block'>
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

        {/* ✅ CTA Button - Centered */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#49B9FF] text-black font-bold px-8 py-3 rounded-full shadow-lg hover:bg-[#36A6E0] active:bg-[#2A89C0] transition-all duration-300"
          >
            Get a Free Quote
          </button>
        </div>
      </div>

      {/* ✅ Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quoteData={quoteData}
      />
    </div>
  );
};

export default Hero;