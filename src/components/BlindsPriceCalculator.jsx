// BlindsPriceCalculator.jsx
import React, { useState, useEffect } from "react";

const BlindsPriceCalculator = ({ basePrice, priceOptions, onRequestQuote }) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [price, setPrice] = useState(null);

  // 단일 옵션 자동 선택
  useEffect(() => {
    if (priceOptions) {
      const keys = Object.keys(priceOptions);
      if (keys.length === 1) setSelectedOption(keys[0]);
    }
  }, [priceOptions]);

  const calculatePrice = () => {
    if (!width || !height) return;

    const area = (width / 1000) * (height / 1000);
    let unitPrice;

    if (selectedOption && priceOptions) {
      unitPrice = priceOptions[selectedOption];
    } else {
      unitPrice = basePrice || 0;
    }

    let total = (area * unitPrice).toFixed(2);
    if (total < 120) total = 120;
    setPrice(total);
  };

  const handleRequestQuote = () => {
    onRequestQuote({
      width,
      height,
      price,
      option: selectedOption,
    });
  };

  const availableOptions = priceOptions ? Object.keys(priceOptions) : [];

  return (
    <form
      className="flex flex-col md:flex-row items-start md:items-center 
      justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] 
      p-6 rounded-xl mx-auto mt-16 max-w-6xl"
    >
      {/* 왼쪽 입력 영역 */}
      <div
        className="flex flex-col flex-wrap md:flex-row items-start md:items-center
        gap-4 md:gap-10 text-gray-500 w-full"
      >
        {/* Option Select */}
        {availableOptions.length > 0 && (
          <div className="flex flex-col">
            <label className="font-medium">Select Option</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            >
              <option value="">Select an option</option>
              {availableOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Width */}
        <div className="flex flex-col">
          <label className="font-medium">Width (mm)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Width"
            className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
            required
          />
        </div>

        {/* Height */}
        <div className="flex flex-col">
          <label className="font-medium">Height (mm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height"
            className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
            required
          />
        </div>
      </div>

      {/* 오른쪽 버튼/가격 영역 */}
      <div className="flex flex-col gap-2 max-md:w-full max-md:mt-6 md:ml-6 w-60">
        <button
          type="button"
          onClick={calculatePrice}
          className="bg-primary hover:bg-primary-dull active:scale-95 
          transition-all text-white rounded-md py-3 md:py-4 text-base cursor-pointer"
        >
          Calculate Price
        </button>

        {price && (
          <>
            <p className="text-lg font-semibold text-center">
              Estimated: ${price}
            </p>
            <button
              type="button"
              onClick={handleRequestQuote}
              className="bg-black hover:bg-gray-800 active:scale-95 
              transition-all text-white rounded-md py-3 md:py-4 text-base cursor-pointer"
            >
              Request a Quote
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default BlindsPriceCalculator;
