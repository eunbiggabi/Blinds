import React, { useEffect } from "react";
import { Helmet } from "react-helmet"; // ✅ react-helmet 사용
import Hero from "../components/Hero";
import FeaturedBlinds from "../components/FeaturedBlinds";
import Testimonial from "../components/Testimonial";

const Home = ({ scrollToBlinds, setScrollToBlinds }) => {
  useEffect(() => {
    if (scrollToBlinds) {
      const sec = document.getElementById("our-blinds");
      if (sec) {
        const navbarHeight = 70;
        const top = sec.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setScrollToBlinds(false);
    }
  }, [scrollToBlinds, setScrollToBlinds]);

  return (
    <>
      {/* ✅ SEO 메타태그 */}
      <Helmet>
        <title>Nice Blinds | Custom Blinds in Australia</title>
        <meta
          name="description"
          content="Discover premium custom blinds manufactured locally. Perfect fit for your home or office with professional installation."
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

      <Hero />
      <FeaturedBlinds />
      <Testimonial />
    </>
  );
};

export default Home;
