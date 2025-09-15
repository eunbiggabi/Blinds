import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { CartContext } from "../context/CartContext";
import emailjs from "@emailjs/browser";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const formRef = useRef();
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [address, setAddress] = useState("");

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  // Google Places Autocomplete
  useEffect(() => {
    if (!isFormOpen) return;
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
  }, [isFormOpen]);

  // Toast 함수
  const showToastMessage = (msg, duration = 1500) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), duration);
  };

  const handleBackHome = () => {
    showToastMessage("Returning to Home...");
    setTimeout(() => navigate("/"), 500);
  };

  const handleQuoteClick = () => {
    showToastMessage("Opening Quote Form...", 500);
    setTimeout(() => setIsFormOpen(true), 500);
  };

  // 이메일 전송
  const sendEmail = (e) => {
    e.preventDefault();

    const cartDetails = cart
      .map(
        (item, idx) =>
          `Item ${idx + 1}:\nType: ${item.blindType}\nWidth: ${item.width}mm\nHeight: ${item.height}mm\nPrice: $${item.price}\n`
      )
      .join("\n");

    const templateParams = {
      from_name: e.target.from_name.value,
      from_email: e.target.from_email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      notes: e.target.notes.value,
      cart_details: cartDetails,
      total_price: totalPrice.toFixed(2),
    };

    emailjs
      .send("service_wj2fibl", "template_o6r1nft", templateParams, "Fg5pzJRE6Jolowm4Y")
      .then(
        () => {
          showToastMessage("Quote request sent! 📩", 2000);
          setIsFormOpen(false);
        },
        (error) => {
          console.error(error);
          showToastMessage("Failed to send 😢", 2000);
        }
      );
  };

  return (
    <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32 relative">
      <Title title="Cart" subTitle="Your blinds at a glance" align="left" />

      {/* Toast 알림 */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn z-50">
          {toastMessage}
        </div>
      )}

      {/* 버튼 그룹 */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center md:justify-start mb-6 mt-10">
        <button
          onClick={handleBackHome}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition w-full md:w-auto"
        >
          Back to Home
        </button>

        <button
          onClick={handleQuoteClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition w-full md:w-auto"
        >
          Request Quote
        </button>
      </div>

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="hidden md:grid md:grid-cols-[3fr_1fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
              <div>Items</div>
              <div>Price</div>
              <div>Delete</div>
            </div>

            {cart.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] border-b py-6"
              >
                <div>
                  <p className="font-bold">{item.blindType}</p>
                  <p className="text-sm text-gray-600">
                    {item.width}mm x {item.height}mm
                  </p>
                </div>
                <div>${item.price}</div>
                <div>
                  <button
                    className="text-red-500 font-bold"
                    onClick={() => removeFromCart(index)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-6 font-bold text-lg">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      {/* Quote Request Form 모달 */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg text-black relative">
            <h2 className="text-xl font-bold mb-4">Request a Quote</h2>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  name="from_name"
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="from_email"
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full border p-2 rounded-md"
                />
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
                <textarea
                  name="notes"
                  className="w-full border p-2 rounded-md h-32"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#49B9FF] text-black px-4 py-2 rounded-lg w-full font-bold mt-2 hover:bg-[#36A6E0] active:bg-[#2A89C0]"
              >
                Submit Request
              </button>
            </form>

            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setIsFormOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
