import React from "react";
import Header from "./Header";
import Hero from "./pembeli/Hero";
import ProductList from "./ProdukList";
import Footer from "./pembeli/Footer";
import AboutUs from "./About";
import Contact from "./Contact";

const LandingPage = () => {
  return (
    <div>
      <div id="home">
        <Header />
        <Hero />
      </div>
      <div id="produk">
        <ProductList />
      </div>
      <div id="tentang-kami">
        <AboutUs />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
