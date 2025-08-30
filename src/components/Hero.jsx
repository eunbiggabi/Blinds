import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Hero = () => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [blindType, setBlindType] = useState("roller");
  const [price, setPrice] = useState(null);
  const [showFormButton, setShowFormButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formRef = useRef();

  // 블라인드 종류별 단가 (m² 기준)
  const priceTable = {
    curtain: 130,
    roller: 80,
    panel: 120,
    venetian: 130,
    vertical: 90,
  };

  const calculatePrice = () => {
    if (!width || !height) return;

    const area = (width / 1000) * (height / 1000);
    const unitPrice = priceTable[blindType] || 0;
    let total = (area * unitPrice).toFixed(2);

      // ✅ 최소 120 보장
  if (total < 120) {
    total = 120;
  }

    setPrice(total);
    setShowFormButton(true);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_wj2fibl", // EmailJS Service ID
        "template_o6r1nft", // EmailJS Template ID
        formRef.current,
        "Fg5pzJRE6Jolowm4Y" // EmailJS Public Key
      )
      .then(
        () => {
          alert("견적 요청이 전송되었습니다! 📩");
          setIsModalOpen(false);
        },
        (error) => {
          console.error(error);
          alert("전송 실패 😢 다시 시도해주세요.");
        }
      );
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

      {/* 가격 계산기 */}
      <div className="bg-black/60 p-6 rounded-2xl mt-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Quick Price Calculator</h2>

        <label className="block mb-2 text-sm">Blind Type</label>
        <select
          value={blindType}
          onChange={(e) => setBlindType(e.target.value)}
          className="w-full p-2 rounded-md text-gray-500 mb-4 border border-gray-300 focus:border-black-500"
        >
          <option value="curtain">Curtain</option>
          <option value="roller">Roller Blind</option>
          <option value="panel">Panel Blind</option>
          <option value="venetian">Venetian Blind</option>
          <option value="vertical">Vertical Blind</option>
        </select>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm">Width (mm)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full text-gray-500 p-2 rounded-md text-black border border-gray-300 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm">Height (mm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full text-gray-500 p-2 rounded-md text-black border border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={calculatePrice}
          className="bg-[#49B9FF] text-black px-4 py-2 rounded-lg w-full font-bold"
        >
          Calculate Price
        </button>

        {price && (
          <>
            <p className="mt-4 text-lg font-semibold">
              Estimated Price: ${price}
            </p>
            <p className="text-s text-gray-500 mt-1">
              note: Fabric options may influence the final price.
            </p>

            {showFormButton && (
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full font-bold"
                onClick={() => setIsModalOpen(true)}
              >
                Request a Quote
              </button>
            )}
          </>
        )}
      </div>

      {/* 모달 (견적 요청 폼) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg text-black relative">
            <h2 className="text-xl font-bold mb-4">Request a Quote</h2>
            
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input type="text" name="from_name" className="w-full border p-2 rounded-md" required />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input type="email" name="from_email" className="w-full border p-2 rounded-md" required />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input type="tel" name="phone" className="w-full border p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-sm mb-1">Address</label>
                <input type="text" name="address" placeholder="Enter your address"
                  className="w-full border p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-sm mb-1">Notes</label>
                <textarea name="notes" className="w-full border p-2 rounded-md h-32"></textarea>
              </div>

              {/* 계산된 값도 같이 전송 */}
              <input type="hidden" name="blind_type" value={blindType} />
              <input type="hidden" name="width" value={width} />
              <input type="hidden" name="height" value={height} />
              <input type="hidden" name="price" value={price} />

              <button
                type="submit"
                className="bg-[#49B9FF] text-black px-4 py-2 rounded-lg w-full font-bold mt-2
                hover:bg-[#36A6E0] active:bg-[#2A89C0]"
                >
                 Submit Request
              </button>
            </form>

            {/* 닫기 버튼 */}
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
