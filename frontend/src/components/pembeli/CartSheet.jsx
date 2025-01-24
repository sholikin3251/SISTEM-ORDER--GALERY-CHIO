import React, { useEffect, useState } from "react";
import {
  getCartItems,
  removeFromCart,
  updateCartItem,
  payCart,
} from "../../api/cartApi";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CartSheet = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [qrCode, setQrCode] = useState(""); // State to store QR Code
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await getCartItems();
      setCartItems(response?.cartItems || []);
    } catch (err) {
      setError("Gagal memuat data keranjang. Silakan coba lagi.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle payment logic
  const handlePayment = async () => {
    try {
      setLoading(true);

      // Validate user data
      if (!userData.name || !userData.phone || !userData.address) {
        alert("Nama, No HP, dan Alamat wajib diisi.");
        return;
      }

      if (cartItems.length === 0) {
        alert("Keranjang kosong, tidak ada item untuk dibayar.");
        return;
      }

      const cartId = cartItems[0]._id;

      const response = await payCart(cartId, userData); // Pass user data

      if (response?.qrCode) {
        setQrCode(response.qrCode); // Set QR Code from backend
        alert("Pembayaran berhasil! Silakan scan QR Code untuk melanjutkan.");
        setPaymentSuccess(true);
        setCartItems([]); // Empty the cart after successful payment
      } else {
        alert(response?.message || "Gagal memproses pembayaran.");
      }
    } catch (err) {
      console.error("Error saat memproses pembayaran:", err.message);
      alert("Terjadi kesalahan saat memproses pembayaran.");
    } finally {
      setLoading(false);
    }
  };

  // Handle item removal from cart
  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      setCartItems(cartItems.filter((item) => item._id !== cartItemId));
    } catch (err) {
      console.error("Gagal menghapus item dari keranjang:", err.message);
      setError("Gagal menghapus item.");
    }
  };

  // Handle updating item quantity in the cart
  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      console.warn("Jumlah tidak boleh kurang dari 1");
      return;
    }
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  // Handle input changes for user data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700 shadow-2xl rounded-l-lg z-50 overflow-auto transform transition-transform duration-300">
      <div className="flex items-center justify-between p-4 bg-purple-800 text-white rounded-tl-lg shadow-md">
        <h2 className="text-2xl font-semibold tracking-wide">Keranjang</h2>
        <button
          onClick={onClose}
          className="hover:bg-purple-600 p-2 rounded-full transition duration-300"
        >
          <XMarkIcon className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Cart Item List */}
      <div className="p-4 space-y-4 overflow-y-auto">
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
                className="flex items-center space-x-4 bg-white shadow-lg rounded-lg p-4 transition-all hover:scale-105 duration-200"
              >
                <img
                  src={`http://localhost:5000${item.product?.image}`}
                  alt={item.product?.name || "Produk"}
                  className="w-16 h-16 rounded-md object-cover border border-gray-200"
                />
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
                <div className="text-right space-y-2">
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md transition duration-300"
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md transition duration-300"
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
                  <button
                    className="text-red-500 text-sm hover:underline transition duration-300"
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

      {/* User Input Data */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white">Data Pengguna</h3>
        <div className="space-y-4 mt-4">
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            placeholder="Nama lengkap"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            placeholder="Nomor Telepon"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            placeholder="Alamat"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
        </div>
      </div>

      {/* Payment Summary */}
      <div className="p-4 bg-purple-800 text-white">
        <p className="text-lg font-semibold">
          Total Keranjang: Rp{" "}
          {cartItems.reduce((acc, item) => acc + item.totalPrice, 0)}
        </p>
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Bayar Sekarang
        </button>

        {/* QR Code Display */}
        {paymentSuccess && qrCode && (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium">
              Scan QR Code untuk pembayaran:
            </p>
            <img
              src={qrCode}
              alt="QR Code"
              className="w-48 h-48 mx-auto mt-2 rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSheet;
