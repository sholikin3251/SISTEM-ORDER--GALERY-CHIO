import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-6 border-t-4 border-purple-500">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Judul */}
        <h2 className="text-4xl font-extrabold mb-4">Tentang Kami</h2>
        <p className="text-lg font-light mb-6">
          Selamat datang di <span className="font-semibold">Gallery Chio</span>,
          tempat terbaik untuk menemukan buket bunga, uang, boneka, dan snack
          yang dirangkai dengan penuh cinta dan kreativitas.
        </p>

        {/* Deskripsi */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <p className="text-base mb-4">
            Kami percaya bahwa setiap momen istimewa layak dirayakan dengan cara
            yang spesial. Itulah sebabnya kami menghadirkan berbagai produk unik
            dan personal yang dirancang untuk membuat hari Anda dan orang
            tercinta menjadi lebih bermakna.
          </p>
          <p className="text-base">
            Dari buket bunga yang elegan hingga buket snack yang menggoda,
            setiap produk kami dibuat dengan bahan berkualitas tinggi dan
            perhatian terhadap detail. Apakah untuk perayaan ulang tahun,
            wisuda, atau momen berharga lainnya, kami siap membantu Anda membuat
            momen menjadi tak terlupakan.
          </p>
        </div>

        {/* Foto Ilustrasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <img
            src="/images/buket-bunga.jpg"
            alt="Buket Bunga"
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
          <img
            src="/images/buket-uang.jpg"
            alt="Buket Uang"
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
          <img
            src="/images/buket-boneka.jpg"
            alt="Buket Boneka"
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
          <img
            src="/images/buket-snack.jpg"
            alt="Buket Snack"
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* CTA */}
        <div className="mt-12">
          <p className="text-lg font-medium mb-4">
            Jadikan setiap momen lebih spesial dengan{" "}
            <span className="font-semibold">Gallery Chio</span>.
          </p>
          <button className="bg-purple-500 hover:bg-purple-600 py-2 px-6 rounded-lg text-white font-semibold transition duration-300">
            <a href="#contact">Hubungi Kami</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
