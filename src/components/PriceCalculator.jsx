import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const PriceCalculator = () => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [blindType, setBlindType] = useState("roller");
  const [price, setPrice] = useState(null);
  const [added, setAdded] = useState(false); // ✅ 추가됨 표시 상태

  const priceTable = {
    roller: 80,
    vertical: 80,
    curtain: 120,
    shutter: 370,
  };

  const calculatePrice = () => {
    if (!width || !height) return;
    const area = (width / 1000) * (height / 1000);
    const unitPrice = priceTable[blindType] || 0;
    let total = (area * unitPrice).toFixed(2);
    if (total < 120) total = 120;
    setPrice(total);
    setAdded(false); // 가격 다시 계산 시 "Added!" 표시 리셋
  };

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ blindType, width, height, price });
    setAdded(true);

    // 2초 뒤에 원래 버튼으로 복구
    setTimeout(() => setAdded(false), 2000);
  };

  return (
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

          <button
            className={`mt-4 px-4 py-2 rounded-lg w-full font-bold transition-colors ${
              added ? "bg-green-600 text-white" : "bg-blue-500 text-white"
            }`}
            onClick={handleAddToCart}
          >
            {added ? "✅ Added to Cart!" : "Add to Cart"}
          </button>
        </>
      )}
    </div>
  );
};

export default PriceCalculator;
