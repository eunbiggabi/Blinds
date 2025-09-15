import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const QuoteModal = ({ isOpen, onClose, quoteData }) => {
  const formRef = useRef();
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    if (!window.google) return;
    const inputEl = addressInputRef.current;
    if (!inputEl) return;
    if (autocompleteRef.current) return;

    const ac = new window.google.maps.places.Autocomplete(inputEl, {
      types: ["geocode"],
      componentRestrictions: { country: "au" },
      fields: ["formatted_address", "geometry", "place_id", "address_components"],
    });
    autocompleteRef.current = ac;

    const listener = ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      setAddress(place?.formatted_address || inputEl.value || "");
    });

    return () => {
      if (listener) window.google.maps.event.removeListener(listener);
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
          onClose();
        },
        (error) => {
          console.error(error);
          alert("전송 실패 😢 다시 시도해주세요.");
        }
      );
  };

  return (
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
          {quoteData && (
            <>
              <input type="hidden" name="blind_type" value={quoteData.blindType} />
              <input type="hidden" name="width" value={quoteData.width} />
              <input type="hidden" name="height" value={quoteData.height} />
              <input type="hidden" name="price" value={quoteData.price} />
            </>
          )}

          <button
            type="submit"
            className="bg-[#49B9FF] text-black px-4 py-2 rounded-lg w-full font-bold mt-2 hover:bg-[#36A6E0] active:bg-[#2A89C0]"
          >
            Submit Request
          </button>
        </form>

        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default QuoteModal;
