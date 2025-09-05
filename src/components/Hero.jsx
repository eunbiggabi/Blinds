import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

const Hero = () => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [blindType, setBlindType] = useState("roller");
  const [price, setPrice] = useState(null);
  const [showFormButton, setShowFormButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");

  const formRef = useRef();
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null); // ✅ 중복 초기화 방지

  // 블라인드 단가
  const priceTable = {
    roller: 80,
    vertical:80,
    curtain: 120,
    shutter: 170,
  };

  const calculatePrice = () => {
    if (!width || !height) return;
    const area = (width / 1000) * (height / 1000);
    const unitPrice = priceTable[blindType] || 0;
    let total = (area * unitPrice).toFixed(2);
    if (total < 120) total = 120;
    setPrice(total);
    setShowFormButton(true);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_wj2fibl",
        "template_o6r1nft",
        formRef.current,
        "Fg5pzJRE6Jolowm4Y"
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

  // ✅ 모달이 열리고 input이 실제로 DOM에 생긴 후 Autocomplete 초기화
  useEffect(() => {
    if (!isModalOpen) return;                        // 모달 닫혀있으면 스킵
    if (!window.google) return;                      // 스크립트 아직이면 스킵
    const inputEl = addressInputRef.current;
    if (!inputEl) return;                            // input 아직이면 스킵
    if (autocompleteRef.current) return;             // 이미 초기화되어 있으면 재생성 X

    const ac = new window.google.maps.places.Autocomplete(inputEl, {
      types: ["geocode"],
      componentRestrictions: { country: "au" },
      // (선택) 필요한 필드만
      fields: ["formatted_address", "geometry", "place_id", "address_components"],
    });
    autocompleteRef.current = ac;

    const listener = ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      // 컨트롤드 input이므로 상태를 반드시 업데이트
      setAddress(place?.formatted_address || inputEl.value || "");
    });

    // ✅ 정리: 모달 닫을 때 리스너 제거 & 인스턴스 해제
    return () => {
      if (listener) window.google.maps.event.removeListener(listener);
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isModalOpen]); // 🔑 모달 열림 상태를 의존성으로

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
      <div className="bg-black/60 p-6 rounded-2xl mt-6 w-full max-w-xl mt-30">
        <h2 className="text-lg font-bold mb-4">Quick Price Calculator</h2>

        <label className="block mb-2 text-sm">Blind Type</label>
        <select
          value={blindType}
          onChange={(e) => setBlindType(e.target.value)}
          className="w-full p-2 rounded-md text-gray-500 mb-4 border border-gray-300 focus:border-black-500"
        >
          
          <option value="roller">Roller Blind</option>
          <option value="vertical">Vertical Blind</option>
          <option value="curtain">Curtain</option>
          <option value="shutter">Shutter</option>
          
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
                {/* ✅ Google Places Autocomplete input */}
                <input
                  type="text"
                  name="address"
                  ref={addressInputRef}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="w-full border p-2 rounded-md"
                />
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
                className="bg-[#49B9FF] text-black px-4 py-2 rounded-lg w-full font-bold mt-2 hover:bg-[#36A6E0] active:bg-[#2A89C0]">
                 Submit Request
              </button>
            </form>

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
