import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-50 text-gray-800 py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Judul */}
        <h2 className="text-4xl font-extrabold text-center mb-6">
          Hubungi Kami
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          Kami di sini untuk membantu Anda. Jangan ragu untuk menghubungi kami
          kapan saja!
        </p>

        {/* Grid Kontak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulir Kontak */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Kirim Pesan</h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nama Anda"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Anda"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tulis pesan Anda di sini"
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Informasi Kontak */}
          <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Informasi Kontak</h3>
            <ul className="space-y-4">
              <li>
                <span className="font-medium">Alamat:</span> Jl. Mawar No. 10,
                Jakarta
              </li>
              <li>
                <span className="font-medium">Telepon:</span>{" "}
                <a
                  href="tel:+6281234567890"
                  className="text-purple-500 hover:underline"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:gallerychio@gmail.com"
                  className="text-purple-500 hover:underline"
                >
                  gallerychio@gmail.com
                </a>
              </li>
              <li>
                <span className="font-medium">Jam Operasional:</span> Senin -
                Sabtu, 08:00 - 17:00
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
