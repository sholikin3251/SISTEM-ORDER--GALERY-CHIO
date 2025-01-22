import React, { useEffect, useState } from "react";
import {
  getCartItems,
  removeFromCart,
  updateCartItem,
} from "../../api/cartApi"; // Pastikan path sesuai
import { XMarkIcon } from "@heroicons/react/24/outline";

const CartSheet = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]); // Inisialisasi sebagai array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Tambahkan state untuk pesan error

  // Fungsi untuk mendapatkan item dari API
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await getCartItems();
      setCartItems(response?.cartItems || []); // Pastikan array, gunakan fallback jika tidak ada data
    } catch (err) {
      console.error("Gagal mendapatkan item keranjang:", err.message);
      setError("Gagal memuat data keranjang."); // Simpan pesan error
      setCartItems([]); // Tetapkan array kosong jika ada error
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus item dari keranjang
  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      setCartItems(cartItems.filter((item) => item._id !== cartItemId)); // Perbarui state
    } catch (err) {
      console.error("Gagal menghapus item dari keranjang:", err.message);
      setError("Gagal menghapus item.");
    }
  };

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      console.warn("Jumlah tidak boleh kurang dari 1");
      return;
    }
    try {
      setLoading(true); // Tampilkan loading
      const response = await updateCartItem(cartItemId, newQuantity);

      if (response?.updatedItem) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === cartItemId
              ? {
                  ...item,
                  quantity: response.updatedItem.quantity,
                  totalPrice: response.updatedItem.totalPrice,
                }
              : item
          )
        );
      } else {
        console.error("Data yang diterima dari API tidak valid.");
      }
    } catch (error) {
      console.error("Gagal memperbarui jumlah item:", error.message);
    } finally {
      setLoading(false); // Sembunyikan loading
    }
  };

  useEffect(() => {}, [cartItems]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="fixed top-0 right-0 h-full bg-gradient-to-b from-purple-500 to-purple-700 shadow-lg w-96 transform translate-x-0 transition-transform duration-300 z-50 rounded-l-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-purple-800 text-white rounded-tl-lg">
        <h2 className="text-2xl font-semibold tracking-wide">Keranjang</h2>
        <button onClick={onClose} className="hover:bg-purple-600 p-2 rounded">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Konten */}
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-white animate-pulse">Memuat keranjang...</p>
          </div>
        ) : error ? (
          <div className="text-red-400 text-center">
            <p>{error}</p>
          </div>
        ) : Array.isArray(cartItems) && cartItems.length > 0 ? (
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4"
              >
                {/* Gambar Produk */}
                <img
                  src={`http://localhost:5000${item.product?.image}`}
                  alt={item.product?.name || "Produk"}
                  className="w-16 h-16 rounded-md object-cover border border-gray-200"
                />

                {/* Detail Produk */}
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {item.product?.name || "Produk tidak diketahui"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.product?.category || "Kategori tidak tersedia"}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    Harga: Rp {item.product?.price || 0}
                  </p>
                </div>

                {/* Kontrol */}
                <div className="text-right space-y-2">
                  {/* Tombol Jumlah */}
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded"
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded"
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    Total: Rp {item.totalPrice || 0}
                  </p>
                  {/* Tombol Hapus */}
                  <button
                    className="text-red-500 text-sm hover:underline"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-white">
            <p className="text-lg font-medium">Keranjang kosong</p>
            <p className="text-sm opacity-75">
              Belanja untuk mengisi keranjang Anda!
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-purple-800 text-white flex justify-between items-center">
        <p className="text-lg font-semibold">
          Total Keranjang: Rp{" "}
          {cartItems.reduce((acc, item) => acc + item.totalPrice, 0)}
        </p>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSheet;
