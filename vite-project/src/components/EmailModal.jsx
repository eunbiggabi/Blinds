import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const EmailModal = ({ isOpen, onClose, cart, totalPrice }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 카트 상세를 문자열로 변환
  const cartDetails = cart.map(
    (item, idx) =>
      `${idx + 1}. ${item.blindType} - ${item.width}mm x ${item.height}mm - $${item.price}`
  ).join("\n");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_wj2fibl", // EmailJS 서비스 ID
      "template_o6r1nft", // EmailJS 템플릿 ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: `Cart Details:\n${cartDetails}\n\nTotal Price: $${totalPrice.toFixed(
          2
        )}\n\nCustomer Message:\n${formData.message}`,
      },
      "Fg5pzJRE6Jolowm4Y" // EmailJS 퍼블릭 키
    )
    .then(() => {
      alert("Your quote request has been sent! 📩");
      onClose();
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((err) => {
      console.error("Error sending email:", err);
      alert("There was an error sending your request. 😢");
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Request a Quote</h2>
        <form onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Additional notes"
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Send Request
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-black w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmailModal;
