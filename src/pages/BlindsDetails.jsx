import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { roomsDummyData } from "../assets/assets";
import QuoteModal from "../components/QuoteModal";
import BlindsPriceCalculator from "../components/BlindsPriceCalculator";
import { facilityIcons } from "../assets/assets";

const BlindsDetails = ({priceOptions}) => {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  // 모달 제어
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const keys = room?.priceOptions ? Object.keys(room.priceOptions) : [];


  useEffect(() => {
    const foundRoom = roomsDummyData.find((room) => room.slug === slug);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [slug]);

  const handleOpenModal = (data) => {
    setQuoteData({ ...data, blindType: room?.name }); // 방 이름도 같이 전달
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuoteData(null);
  };

  if (!room) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl font-semibold">The requested blind cannot be found.</p>
      </div>
    );
  }

  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-16 xl:px-32">
      {/* 제목 */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">{room.name}
          
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white 
        bg-orange-500 rounded-full">Options</p>
        <span className="font-inter text-sm">({keys.join(", ")})</span>
      </div>

      {/* blinds duration */}
      <div className="flex items-center gap-1 mt-2">
        <p className="text-xs font-inter py-1.5 px-3 text-white 
        bg-blue-500 rounded-full ">Project Timeline</p>
        <span className="ml-2 font-inter text-sm">{room.projectTimeline}</span>
      </div>

      {/* 이미지 */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage}
            alt={room.name}
            className="w-full rounded-xl shadow-lg object-cover"
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
                className={`w-full rounded-xl shadow-md object-cover cursor-pointer 
                  ${mainImage === image ? "outline-4 outline-orange-500" : ""}`}
              />
            ))}
        </div>
      </div>

      {/* Blinds Highlight */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.subtitle} </h1>
            {/* <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
               <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                  <img src={facilityIcons[item]} alt={item} className="w-5 h-5"/>
                  <p className="text-xs">{item}</p>
                </div>
             
            ))}  
            </div> */}
        </div>
        {/* Blinds Price */}
        {/* <p className="text-2xl font-medium">${room.pricePerNight}/night</p> */}
      </div>



      {/* 가격 계산기 */}
      {/* {room.slug !== "others" && (
        <div className="">
          <BlindsPriceCalculator basePrice={room.price} priceOptions={room.priceOptions} onRequestQuote={handleOpenModal} name={room.name}/>
        </div>
      )} */}

      {/* 모달 */}
      {/* <QuoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quoteData={quoteData}
      /> */}

      {/* Common Specifications */}
     
         <div className="max-w-3xl border-y border-gray-300 
            my-15 py-10 text-gray-500">
          <p>{room.description}</p>
          {room.trend !== "others" && (
          <p className="mt-3 text-l md:text-xl">Trend 2025: {room.trend}</p>
                )}
        </div>

       

    </div>

    
  );
};

export default BlindsDetails;


      {/* CheckIn CheckOut Form */}
      // <form className="flex flex-col md:flex-row items-start md:items-center 
      // justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl
      // mx-auto mt-16 max-w-6xl" >

      //   <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center
      //   gap-4 md:gap-10 text-gray-500">

      //      <div className="flex flex-col">
      //       <label htmlFor="" className="font-medium">height</label>
      //       <select type="number"
      //       placeholder="Height"
      //       className="w-full rounded border border-gray-300 px-3 
      //       py-2 mt-1.5 outline-none" required/>
      //     </div>

      //     <div className="flex flex-col">
      //       <label htmlFor="" className="font-medium">Weight</label>
      //       <input type="number"
      //       placeholder="Weight"
      //       className="w-full rounded border border-gray-300 px-3 
      //       py-2 mt-1.5 outline-none" required/>
      //     </div>

      //      <div className="flex flex-col">
      //       <label htmlFor="" className="font-medium">height</label>
      //       <input type="number"
      //       placeholder="Height"
      //       className="w-full rounded border border-gray-300 px-3 
      //       py-2 mt-1.5 outline-none" required/>
      //     </div>


      //   </div>

      //   <button type="submit" className="bg-primary hover:bg-primary-dull active:scale-95 
      //   transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3
      //   md:py-4 text-base cursor-pointer">
          
      // </button>

      // </form>