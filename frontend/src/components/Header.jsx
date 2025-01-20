import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-purple-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo atau Nama Toko */}
        <Link to="/" className="text-white text-2xl font-bold">
          Fan8Ball Buket
        </Link>

        {/* Menu Navigasi */}
        <nav className="flex space-x-6 text-white">
          <Link to="/" className="hover:text-purple-200">
            Halaman Utama
          </Link>
          <Link to="/produk" className="hover:text-purple-200">
            Produk
          </Link>
          <Link to="/keranjang" className="hover:text-purple-200">
            Keranjang Belanja
          </Link>
          <Link to="/checkout" className="hover:text-purple-200">
            Checkout
          </Link>
          <Link to="/riwayat" className="hover:text-purple-200">
            Riwayat Pesanan
          </Link>
          <Link to="/tentang" className="hover:text-purple-200">
            Tentang Kami
          </Link>
          <Link to="/hubungi" className="hover:text-purple-200">
            Hubungi Kami
          </Link>
        </nav>

        {/* Tombol Login dan Register */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="text-white px-4 py-2 bg-purple-500 rounded hover:bg-purple-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-purple-600 px-4 py-2 border-2 border-purple-500 rounded hover:bg-purple-500 hover:text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
