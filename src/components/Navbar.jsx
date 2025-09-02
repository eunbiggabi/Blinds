import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import emailjs from "@emailjs/browser";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blinds", path: "/blinds" },
    { name: "Contact", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const formRef = useRef();

  // ✅ 주소 자동완성 관련
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ 모달 열릴 때만 Google Places Autocomplete 초기화
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
          setIsFormOpen(false);
        },
        (error) => {
          console.error(error);
          alert("전송 실패 😢 다시 시도해주세요.");
        }
      );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
            : "py-4 md:py-6"
        }`}
      >
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.kaiblindslogo}
            alt="logo"
            className={`h-12 ${isScrolled && "invert opacity-80"}`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </a>
          ))}
          <button
            onClick={() => setIsFormOpen(true)}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
              isScrolled ? "text-white bg-black" : "bg-white text-black"
            }`}
          >
            Quote Request
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <img
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            src={assets.menuIcon}
            alt="menu"
            className={`${isScrolled && "invert"} h-4`}
          />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
          </button>

          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsFormOpen(true);
            }}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Quote Request
          </button>
        </div>
      </nav>

      {/* ✅ Quote Request Form 모달 (주소 자동완성 적용됨) */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
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
    </>
  );
};

export default Navbar;
