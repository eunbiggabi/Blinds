import React, { useState } from "react";

const PriceCalculator = ({ onRequestQuote }) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [blindType, setBlindType] = useState("roller");
  const [price, setPrice] = useState(null);

  const priceTable = {
    roller: 80,
    vertical: 80,
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
          <p className="text-s text-gray-500 mt-1">
            note: Fabric options may influence the final price.
          </p>

          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full font-bold"
            onClick={() =>
              onRequestQuote({ blindType, width, height, price })
            }
          >
            Request a Quote
          </button>
        </>
      )}
    </div>
  );
};

export default PriceCalculator;
