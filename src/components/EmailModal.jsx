import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const EmailModal = ({ isOpen, onClose, subject }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_wj2fibl", // EmailJS 서비스 ID
      "template_o6r1nft", // EmailJS 템플릿 ID
      {
        ...formData,
        subject, // 블라인드 이름 자동으로 넣어주기
      },
      "Fg5pzJRE6Jolowm4Y" // EmailJS 퍼블릭 키
    )
    .then(() => {
      alert("문의가 전송되었습니다!");
      onClose();
    })
    .catch((err) => {
      console.error("전송 오류:", err);
      alert("전송 중 오류가 발생했습니다.");
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">문의하기</h2>
        <form onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="문의 내용을 입력하세요"
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            전송하기
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-black w-full"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default EmailModal;
