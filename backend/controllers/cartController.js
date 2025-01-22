const Cart = require("../models/Cart");
const Buket = require("../models/Buket");

// Menambahkan produk ke keranjang
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validasi input
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "ProductId dan quantity wajib diisi." });
    }

    // Cari produk berdasarkan ID
    const product = await Buket.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    // Hitung total harga
    const totalPrice = product.price * quantity;

    // Simpan produk ke keranjang
    const cartItem = new Cart({
      product: productId,
      quantity,
      totalPrice,
      user: req.user ? req.user._id : null, // Optional, jika user login
    });

    await cartItem.save();
    res
      .status(201)
      .json({ message: "Produk berhasil ditambahkan ke keranjang.", cartItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan.", error: error.message });
  }
};

// Mendapatkan semua item dalam keranjang
exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null; // Optional, jika user login

    // Ambil item dari keranjang
    const cartItems = await Cart.find(userId ? { user: userId } : {})
      .populate("product", "name price category image") // Mengambil detail produk
      .exec();

    res
      .status(200)
      .json({ message: "Daftar item dalam keranjang.", cartItems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan.", error: error.message });
  }
};

// Menghapus item dari keranjang
exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    // Hapus item dari keranjang
    const deletedItem = await Cart.findByIdAndDelete(cartItemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan." });
    }

    res
      .status(200)
      .json({ message: "Item berhasil dihapus dari keranjang.", deletedItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan.", error: error.message });
  }
};

// Mengupdate kuantitas item dalam keranjang
exports.updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    // Validasi input
    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity harus lebih besar dari 0." });
    }

    // Cari item keranjang dengan populate untuk mengambil data produk
    const cartItem = await Cart.findById(cartItemId).populate("product");
    if (!cartItem) {
      return res.status(404).json({ message: "Item tidak ditemukan." });
    }

    // Pastikan harga produk tersedia
    if (!cartItem.product || typeof cartItem.product.price !== "number") {
      return res
        .status(500)
        .json({ message: "Harga produk tidak valid atau tidak ditemukan." });
    }

    // Update kuantitas dan total harga
    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.product.price * quantity;
    await cartItem.save();

    res
      .status(200)
      .json({ message: "Item berhasil diperbarui.", updatedItem: cartItem });
  } catch (error) {
    console.error("Gagal memperbarui item keranjang:", error.message);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan.", error: error.message });
  }
};
