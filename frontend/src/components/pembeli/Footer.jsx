import React from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-purple-500 text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Name */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-2xl font-bold tracking-wide text-purple-300">
              Gallery Chio
            </h1>
            <p className="text-sm text-white mt-1">
              Creating timeless memories
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="mb-6 md:mb-0">
            <ul className="flex flex-wrap gap-4 text-sm">
              <li>
                <a
                  href="#home"
                  className="text-white hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#produk"
                  className="text-white hover:text-white transition-colors"
                >
                  Produk
                </a>
              </li>
              <li>
                <a
                  href="#tentang-kami"
                  className="text-white hover:text-white transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center text-white">
              <PhoneIcon className="h-5 w-5 mr-2" />
              +123 456 7890
            </div>
            <div className="flex items-center text-white">
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              gallerychio@gmail.com
            </div>
            <div className="flex items-center text-white">
              <MapPinIcon className="h-5 w-5 mr-2" />
              123 Main Street, Cityville
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-white mt-8">
          &copy; {new Date().getFullYear()} Gallery Chio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
