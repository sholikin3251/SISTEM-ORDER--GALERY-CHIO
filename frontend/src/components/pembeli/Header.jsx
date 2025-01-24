import React, { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import CartSheet from "./CartSheet";
import logo from "../../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false); // State untuk kontrol CartSheet

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <header className="bg-white text-white shadow-lg">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <img src={logo} alt="Gallery Chio" className="w-64 h-64 py-12" />
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex text-xl space-x-8">
            <a
              href="#home"
              className="text-purple-500 hover:text-purple-900 transition-colors"
            >
              Home
            </a>
            <a
              href="#produk"
              className="text-purple-500 hover:text-purple-900 transition-colors"
            >
              Produk
            </a>
            <a
              href="#tentang-kami"
              className="text-purple-500 hover:text-purple-900 transition-colors"
            >
              Tentang Kami
            </a>
            <a
              href="#contact"
              className="text-purple-500 hover:text-purple-900 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Cart and Logout Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)} // Tampilkan CartSheet
              className="flex items-center text-purple-500 hover:text-purple-900 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleLogout}
              className="border border-purple-500 hover:bg-purple-100 text-purple-500 py-2 px-4 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* CartSheet */}
      {isCartOpen && (
        <CartSheet onClose={() => setIsCartOpen(false)} /> // Kirim prop onClose ke CartSheet
      )}
    </>
  );
};

export default Header;
