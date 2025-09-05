import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { roomsDummyData } from "../assets/assets";
import emailjs from "@emailjs/browser"; // EmailJS 불러오기

const BlindsDetails = () => {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  // 가격 계산 state
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [price, setPrice] = useState(null);

  // 모달 제어
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const foundRoom = roomsDummyData.find((room) => room.slug === slug);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [slug]);

  const calculatePrice = () => {
    if (!width || !height || !room?.price) return;
    const area = (width / 1000) * (height / 1000);
    let total = (area * room.price).toFixed(2);
    if (total < 120) total = 120;
    setPrice(total);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      blindsType: room?.name,
      width,
      height,
      price,
      customer_name: e.target.name.value,
      customer_email: e.target.email.value,
      message: e.target.message.value,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID", // EmailJS service ID
        "YOUR_TEMPLATE_ID", // EmailJS template ID
        templateParams,
        "YOUR_PUBLIC_KEY" // EmailJS public key
      )
      .then(
        (result) => {
          alert("견적 요청이 성공적으로 전송되었습니다!");
          setShowModal(false);
        },
        (error) => {
          alert("전송에 실패했습니다. 다시 시도해주세요.");
        }
      );
  };

  if (!room) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl font-semibold">해당 블라인드를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-16 xl:px-32">
      {/* 제목 */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">{room.name}</h1>
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

      {/* 가격 계산기 */}
      {room.slug !== "others" && (
        <div className="mt-10 bg-gray-100 p-6 rounded-2xl w-full max-w-lg">
          <h2 className="text-lg font-bold mb-4">Quick Price Calculator</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm">Width (mm)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm">Height (mm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300"
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
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Estimated Price: ${price}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-3 bg-black text-white px-4 py-2 rounded-lg w-full font-bold"
              >
                Request a Quote
              </button>
            </div>
          )}
        </div>
      )}

      {/* EmailJS 모달 */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Request a Quote</h2>
            <form onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 border rounded-md"
                required
              />
              <textarea
                name="message"
                placeholder="Additional Message"
                className="w-full p-2 border rounded-md"
                rows="3"
              />
              {/* 숨겨진 필드 (자동 채워짐) */}
              <input type="hidden" name="blindsType" value={room?.name} />
              <input type="hidden" name="width" value={width} />
              <input type="hidden" name="height" value={height} />
              <input type="hidden" name="price" value={price} />

              <button
                type="submit"
                className="bg-[#49B9FF] text-black px-4 py-2 rounded-lg w-full font-bold"
              >
                Send Request
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-sm text-gray-600 underline w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlindsDetails;
