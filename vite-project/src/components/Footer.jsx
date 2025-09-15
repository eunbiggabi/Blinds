import React from "react";
import { Helmet } from "react-helmet"; // ✅ SEO용
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="text-gray-500/80 pt-12 px-6 md:px-16 lg:px-24 xl:px-32 bg-[#f6f9fc]">
      {/* ✅ SEO 메타 */}
      <Helmet>
        <meta
          name="description"
          content="Kai Blinds delivers premium custom blinds across Australia with trusted quality, professional service, and expert installation."
        />
        <meta property="og:title" content="Kai Blinds - Quality Custom Blinds in Australia" />
        <meta
          property="og:description"
          content="Explore our custom blinds and experience professional installation and premium quality."
        />
        <meta property="og:image" content={assets.kaiblindslogo} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex flex-wrap justify-center gap-12 md:gap-6">
        {/* Left Section - Logo + Description + Social */}
        <div className="max-w-80">
          <img
            src={assets.kaiblindslogo}
            alt="Kai Blinds Logo"
            className="mb-4 h-12 md:h-14"
            loading="lazy"
          />
          <p className="text-sm leading-relaxed">
            Delivering blinds with trusted quality and professional service, creating lasting comfort in every home.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://www.instagram.com/nice_blinds/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={assets.instagramIcon}
                alt="Instagram Icon"
                className="w-6 hover:opacity-80 transition"
                loading="lazy"
              />
            </a>
            <a
              href="https://www.facebook.com/NiceBlindsBrisbane/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={assets.facebookIcon}
                alt="Facebook Icon"
                className="w-6 hover:opacity-80 transition"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        {/* Middle Section - Contact Info */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Contact Info</h3>
          <p className="text-sm">
            <span className="font-medium text-gray-700">Address:</span> <br />
            Unit 2/19 Aranda Street, Slacks Creek, QLD 4127
          </p>
          <p className="text-sm mt-3">
            <span className="font-medium text-gray-700">Email:</span> <br />
            <a href="mailto:kaiblinds@gmail.com" className="hover:text-gray-700">
              kaiblinds@gmail.com
            </a>
          </p>
          <p className="text-sm mt-3">
            <span className="font-medium text-gray-700">Phone:</span> <br />
            <a href="tel:0430080216" className="hover:text-gray-700 transition">
              0430 080 216
            </a>
          </p>
        </div>

        {/* Right Section - Business Hours + CTA + slogan */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Business Hours</h3>
          <p className="text-sm">Monday – Friday: 9:00 am – 5:00 pm</p>
          <p className="text-sm">Saturday – Sunday: Closed</p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-xs text-gray-400 text-center max-w-xs">
             “Kai Blinds is proudly powered by Nice Blinds – your local blinds manufacturer in Brisbane.”
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mt-8" />

      {/* Google Map */}
      <div className="mt-6 flex justify-center">
        <iframe
          title="Kai Blinds Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.123456789!2d153.120000!3d-27.600000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915abcdef12345%3A0xabcdef123456789!2sUnit%202%2F19%20Aranda%20St%2C%20Slacks%20Creek%20QLD%204127!5e0!3m2!1sen!2sau!4v1690000000000!5m2!1sen!2sau"
          width="100%"
          height="80"
          className="rounded-md shadow-md"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} Kai Blinds. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
