const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { protect } = require("../middleware/auth");

// Endpoint untuk menambahkan produk ke keranjang
router.post("/add-to-cart", protect, cartController.addToCart);

// Endpoint untuk mendapatkan semua item dalam keranjang
router.get("/items", protect, cartController.getCartItems);

// Endpoint untuk menghapus item dari keranjang
router.delete("/remove/:cartItemId", protect, cartController.removeFromCart);

// Endpoint untuk memperbarui kuantitas item dalam keranjang
router.put("/update/:cartItemId", protect, cartController.updateCartItem);

module.exports = router;
