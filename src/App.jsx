import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BlindsDetails from './pages/BlindsDetails';
import { roomsDummyData } from './assets/assets';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* slug 기반 블라인드 상세 페이지 */}
          <Route path="/blinds/:slug" element={<BlindsDetails blinds={roomsDummyData} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
