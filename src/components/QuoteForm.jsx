import React, { useState } from "react";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    width: "",
    height: "",
    productType: "roller", // 기본값
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 견적 요청 버튼 클릭
  const handleSubmit = (e) => {
    e.preventDefault();

    // 여기에서 이메일 전송 or DB 저장 로직 연결 가능
    console.log("견적 요청:", formData);

    alert("견적 요청이 접수되었습니다! 빠른 시일 내에 연락드리겠습니다.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-6 max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        무료 견적 요청
      </h2>

      {/* 이름 */}
      <input
        type="text"
        name="name"
        placeholder="이름"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
      />

      {/* 전화번호 */}
      <input
        type="tel"
        name="phone"
        placeholder="전화번호"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
      />

      {/* 이메일 */}
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
      />

      {/* 제품 종류 선택 */}
      <select
        name="productType"
        value={formData.productType}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
      >
        <option value="roller">롤러 블라인드</option>
        <option value="venetian">베네시안 블라인드</option>
        <option value="zebra">콤비 블라인드</option>
        <option value="curtain">커튼</option>
      </select>

      {/* 사이즈 입력 */}
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          name="width"
          placeholder="가로 (cm)"
          value={formData.width}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="height"
          placeholder="세로 (cm)"
          value={formData.height}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
      >
        견적 요청
      </button>
    </form>
  );
};

export default QuoteForm;
