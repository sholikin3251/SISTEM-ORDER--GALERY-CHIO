import axios from "axios";

// Buat instance axios khusus untuk API cart
const cartApi = axios.create({
  baseURL: "http://localhost:5000/api/cart", // Ganti dengan URL backend Anda jika berbeda
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan interceptor untuk menangani token jika diperlukan
cartApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fungsi untuk menambahkan produk ke keranjang
export const addToCart = async (productId, quantity) => {
  try {
    const response = await cartApi.post("/add-to-cart", {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error menambahkan produk ke keranjang:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Fungsi untuk mendapatkan semua item di keranjang
export const getCartItems = async () => {
  try {
    const response = await cartApi.get("/items");
    return response.data; // Pastikan data dari API sesuai
  } catch (error) {
    console.error(
      "Error mendapatkan item keranjang:",
      error.response?.data || error.message
    );
    throw error;
  }
};
// Fungsi untuk menghapus item dari keranjang
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await cartApi.delete(`/remove/${cartItemId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error menghapus item dari keranjang:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Fungsi untuk memperbarui kuantitas item dalam keranjang
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await cartApi.put(`/update/${cartItemId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error(
      "Error memperbarui item keranjang:",
      error.response?.data || error.message
    );
    throw error;
  }
};
