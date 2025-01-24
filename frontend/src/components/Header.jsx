import React, { useState } from "react";
import logo from "../assets/logo.png";
import LoginModal from "../components/auth/LoginForm";
import RegisterModal from "../components/auth/RegisterForm";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false); // State untuk kontrol modal login
  const [showRegisterModal, setShowRegisterModal] = useState(false); // State untuk kontrol modal register
  const [showCartModal, setShowCartModal] = useState(false); // State untuk kontrol modal cart

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
              className="text-purple-500  hover:text-purple-900 transition-colors"
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

          {/* Cart, Sign In, and Sign Up Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowCartModal(true)} // Tampilkan modal cart
              className="flex items-center text-purple-500 hover:text-purple-900 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => setShowLoginModal(true)} // Tampilkan modal login
              className="border border-purple-500 hover:bg-purple-100 text-purple-500 py-2 px-4 rounded transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowRegisterModal(true)} // Tampilkan modal register
              className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login to access your cart.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCartModal(false)}
                className="py-2 px-4 border rounded text-gray-500 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCartModal(false);
                  setShowLoginModal(true);
                }}
                className="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </>
  );
};

export default Header;
