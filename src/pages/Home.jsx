import React, { useEffect } from "react";
import Hero from "../components/Hero";
import FeaturedBlinds from "../components/FeaturedBlinds";
import Testimonial from "../components/Testimonial";

const Home = ({ scrollToBlinds, setScrollToBlinds }) => {
  useEffect(() => {
    if (scrollToBlinds) {
      const sec = document.getElementById("our-blinds");
      if (sec) {
        const navbarHeight = 70; // navbar 실제 높이
        const top = sec.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setScrollToBlinds(false);
    }
  }, [scrollToBlinds, setScrollToBlinds]);

  return (
    <>
      <Hero />
      <FeaturedBlinds />
      <Testimonial />
    </>
  );
};

export default Home;
