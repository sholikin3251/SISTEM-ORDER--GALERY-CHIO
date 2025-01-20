import axios from "axios";

// Base URL API
const API_URL = "http://localhost:5000/api/buket";

// Get all bukets
export const getAllBukets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bukets:", error);
    throw error;
  }
};

// Get buket by ID
export const getBuketById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching buket by ID:", error);
    throw error;
  }
};

// Add a new buket
export const addBuket = async (buketData, imageFile) => {
  const formData = new FormData();
  formData.append("name", buketData.name);
  formData.append("category", buketData.category);
  formData.append("price", buketData.price);
  formData.append("description", buketData.description);
  formData.append("stock", buketData.stock);
  if (imageFile) formData.append("image", imageFile);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding buket:", error);
    throw error;
  }
};

export const updateBuket = async (id, buketData, imageFile) => {
  // Memastikan ID valid
  if (!id || typeof id !== "string" || id.length !== 24) {
    throw new Error("Invalid Buket ID");
  }

  const formData = new FormData();
  formData.append("name", buketData.name);
  formData.append("category", buketData.category);
  formData.append("price", buketData.price);
  formData.append("description", buketData.description);
  formData.append("stock", buketData.stock);

  // Menambahkan image jika ada
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    // Mengirim request PUT untuk memperbarui buket
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Header untuk upload file
      },
    });

    return response.data; // Mengembalikan data response jika berhasil
  } catch (error) {
    // Menangani error dengan lebih baik
    console.error(
      "Error updating buket:",
      error.response?.data || error.message
    );

    // Memeriksa jika error memiliki response dan menampilkan pesan error spesifik
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to update buket.");
    }

    // Jika tidak ada response error, mengembalikan pesan umum
    throw new Error(error.message || "An unknown error occurred.");
  }
};
// Delete a buket
export const deleteBuket = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting buket:", error);
    throw error;
  }
};

// Update stock status
export const updateStock = async (id, stockStatus) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/stock`, {
      stock: stockStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating stock status:", error);
    throw error;
  }
};
