import React, { useState } from "react";
import PriceCalculator from "./PriceCalculator";
import QuoteModal from "./QuoteModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  const handleOpenModal = (data) => {
    setQuoteData(data);       // 계산기에서 전달된 값 저장
    setIsModalOpen(true);     // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);    // 모달 닫기
    setQuoteData(null);
  };

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroMain.jpg")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>
        Custom Blinds, Perfect Fit for Your Home
      </p>
      <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-x1 mt-4'>
        Tailored solutions with professional installation.
      </h1>
      <p className='max-w-130 mt-2 text-sm md:text-base'>
        We manufacture and distribute a wide range of window coverings for
        domestic and commercial markets here at Nice Blinds. Providing
        high-quality blinds straight from our workshop, you can be sure that
        your purchase will last and look great!
      </p>

      {/* ✅ 가격 계산기 (Hero → 모달 제어) */}
      {/* <div className="">
        <PriceCalculator onRequestQuote={handleOpenModal} />
      </div> */}

      {/* ✅ 모달 */}
      {/* <QuoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quoteData={quoteData}
      /> */}
    </div>
  );
};

export default Hero;
