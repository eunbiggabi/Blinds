import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BlindsDetails from './pages/BlindsDetails';
import { roomsDummyData } from './assets/assets';
import Footer from './components/Footer';
import { CartProvider } from "./context/CartContext";
import Cart from './pages/Cart';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <CartProvider>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* slug 기반 블라인드 상세 페이지 */}
          <Route path="/blinds/:slug" element={<BlindsDetails blinds={roomsDummyData} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>    
      </div>
      <Footer />
    </CartProvider>
  );
};

export default App;
