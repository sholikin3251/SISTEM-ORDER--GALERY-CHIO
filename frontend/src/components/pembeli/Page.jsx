import React from "react";
import ProductList from "./ProdukList";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import AboutUs from "../About";
import Contact from "../Contact";

const Page = () => {
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

export default Page;
