import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules"; // Autoplay module
import BuketBunga from "../../assets/Buket-Bunga.jpg";
import BuketBunga2 from "../../assets/Buket-Bunga2.jpg";
import BuketBunga3 from "../../assets/Buket-Bunga3.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden text-white">
      {/* Swiper Carousel */}
      <Swiper
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-slide
        loop={true}
        modules={[Navigation, Autoplay]}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${BuketBunga})` }}
          >
            <div className="bg-gradient-to-b from-white via-transparent to-purple-200 absolute inset-0"></div>
            <div className="relative z-10 text-center p-6 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                Bouquet Uang & Bunga
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                Ungkapan cinta yang mewah untuk momen spesial.
              </p>
              <button className="px-6 py-3 text-lg font-semibold bg-purple-500 hover:bg-purple-600 transition-all duration-300 rounded-full shadow-lg">
                Lihat Koleksi
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${BuketBunga2})` }}
          >
            <div className="bg-gradient-to-b from-white via-transparent to-purple-200 absolute inset-0"></div>
            <div className="relative z-10 text-center p-6 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                Bouquet Snack
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                Nikmati momen istimewa dengan kelezatan.
              </p>
              <button className="px-6 py-3 text-lg font-semibold bg-purple-500 hover:bg-purple-600 transition-all duration-300 rounded-full shadow-lg">
                Lihat Koleksi
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${BuketBunga3})` }}
          >
            <div className="bg-gradient-to-b from-white via-transparent to-purple-200 absolute inset-0"></div>
            <div className="relative z-10 text-center  p-6 max-w-4xl  ">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                Bouquet Boneka
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                Kado yang lucu dan penuh kenangan manis.
              </p>
              <button className="px-6 py-3 text-lg font-semibold bg-purple-500 hover:bg-purple-600 transition-all duration-300 rounded-full shadow-lg">
                Lihat Koleksi
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Slogan Footer */}
      <div className="absolute bottom-12 left-0 right-0 text-center z-10">
        <p className="text-gray-800 text-lg">
          "Gallery Chio - Menghadirkan keindahan dalam setiap detail."
        </p>
      </div>
    </section>
  );
};

export default Hero;
