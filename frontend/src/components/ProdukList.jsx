import React, { useEffect, useState } from "react";
import { getAllBukets } from "../api/buketApi";
import LoginModal from "../components/auth/LoginForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false); // State untuk kontrol modal cart
  const [showLoginModal, setShowLoginModal] = useState(false); // State untuk kontrol modal login

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllBukets();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-8">Loading produk...</p>;
  if (error)
    return <p className="text-center py-8 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold mb-4 text-center">Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300"
          >
            {/* Container untuk gambar */}
            <div className="relative h-64 flex items-center justify-center bg-gray-100 rounded-t-lg overflow-hidden">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="h-64 w-64 object-contain"
              />
              <span className="absolute top-2 left-2 bg-purple-500 text-white text-sm px-3 py-1 rounded-lg">
                {product.category}
              </span>
            </div>
            {/* Informasi produk */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-gray-900 mb-4">
                Rp{product.price}
              </p>
              <button
                onClick={() => setShowCartModal(true)} // Tampilkan modal cart
                className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-400 transition-all duration-300"
              >
                Tambahkan ke Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default ProductList;
