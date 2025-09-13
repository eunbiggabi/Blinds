import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
        <Route path="/room_guide" element={<RoomGuide />} /> {/* 이 라우트를 추가하세요 */}
        <Route path="/blog" element={<Blog />} /> {/* <--- 이 라우트를 추가하세요 */}
      </Routes>
      <Footer />
    </CartProvider>
  );
};

export default App;
