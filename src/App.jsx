import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import { roomsDummyData } from './assets/assets';
import BlindsDetails from "./pages/BlindsDetails";
import Gallery from "./pages/Gallery";
import RoomGuide from "./pages/RoomGuide";
import Blog from "./pages/Blog";

// ------------------- ScrollManager -------------------
const ScrollManager = ({ scrollToBlinds }) => {
  const { pathname } = useLocation();
  const positions = useRef({}); // 페이지별 스크롤 위치 저장

  // 페이지 이동 전 스크롤 저장
  useEffect(() => {
    const saveScroll = () => {
      positions.current[window.location.pathname] = window.scrollY;
    };
    window.addEventListener("beforeunload", saveScroll);
    return () => window.removeEventListener("beforeunload", saveScroll);
  }, []);

  // 뒤로가기/앞으로가기 처리
  useEffect(() => {
    const handlePopState = () => {
      const pos = positions.current[window.location.pathname] || 0;
      window.scrollTo({ top: pos, behavior: "auto" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return null; // 실제 스크롤 동작은 Home.jsx에서 처리
};
// ---------------------------------------------------

const App = () => {
  const [scrollToBlinds, setScrollToBlinds] = useState(false);

  return (
    <CartProvider>
      {/* 공통 SEO 기본 템플릿 */}
      <Helmet>
        <title>Nice Blinds | Custom Blinds in Australia</title>
        <meta
          name="description"
          content="Premium custom blinds for homes and offices in Australia. Locally made, durable, and stylish."
        />
        <link rel="canonical" href="https://www.niceblinds.com.au/" />

        {/* Open Graph */}
        <meta property="og:title" content="Nice Blinds | Custom Blinds in Australia" />
        <meta
          property="og:description"
          content="High-quality blinds straight from our workshop. Durable, stylish, and tailored to your needs."
        />
        <meta property="og:image" content="/assets/og-image.jpg" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nice Blinds | Custom Blinds in Australia" />
        <meta
          name="twitter:description"
          content="Premium custom blinds for homes and offices. Locally made, durable, and stylish."
        />
        <meta name="twitter:image" content="/assets/og-image.jpg" />
      </Helmet>

      <Navbar setScrollToBlinds={setScrollToBlinds} />
      <ScrollManager scrollToBlinds={scrollToBlinds} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              scrollToBlinds={scrollToBlinds}
              setScrollToBlinds={setScrollToBlinds}
            />
          }
        />
        <Route path="/blinds/:slug" element={<BlindsDetails blinds={roomsDummyData} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/room_guide" element={<RoomGuide />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
};

export default App;
