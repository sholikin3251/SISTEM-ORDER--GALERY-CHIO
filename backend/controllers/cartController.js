const Cart = require("../models/Cart");
const Buket = require("../models/Buket");
const Order = require("../models/Order");
const QRCode = require("qrcode"); // Import QRCode
// Fungsi untuk generate QR Code dummy
const generateQRCode = async (orderId) => {
  try {
    const qrCodeData = `http://localhost:5000/api/cart/payment/${orderId}`; // Ganti dengan URL yang sesuai untuk backend
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    return qrCodeImage; // Kembalikan QR code dalam format base64
  } catch (error) {
    console.error("Error saat membuat QR Code:", error);
    return null;
  }
};

// Endpoint untuk menangani pembayaran berdasarkan orderId
exports.processPayment = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Cari order berdasarkan orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan." });
    }

    // Cek status order
    if (order.status === "paid") {
      return res.status(400).json({ message: "Order sudah dibayar." });
    }

    // Update status order menjadi "paid"
    order.status = "paid";
    await order.save();

    // Kembalikan respon sukses
    res.status(200).json({ message: "Pembayaran berhasil", order });
  } catch (error) {
    console.error("Error saat memproses pembayaran:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memproses pembayaran.",
      error: error.message,
    });
  }
};

exports.payCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User tidak terautentikasi" });
    }

    const { cartId } = req.params;
    const { name, phone, address } = req.body; // Ambil data nama, no HP, dan alamat

    if (!name || !phone || !address) {
      return res
        .status(400)
        .json({ message: "Nama, no HP, dan alamat wajib diisi." });
    }

    const cartItems = await Cart.find({ _id: cartId });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "Keranjang tidak ditemukan." });
    }

    const userId = req.user._id;

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    const newOrder = new Order({
      user: userId,
      items: cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
      totalAmount,
      status: "pending", // Status awal "pending"
      name,
      phone,
      address,
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();

    // Generate QR code untuk transaksi dummy
    const qrCode = await generateQRCode(savedOrder._id);

    // Hapus cart setelah pembayaran berhasil
    await Cart.deleteOne({ _id: cartId }); // Menghapus cart berdasarkan cartId

    res.status(200).json({
      message:
        "Pembayaran dummy berhasil. Silakan lakukan pembayaran melalui QR Code.",
      qrCode: qrCode, // QR Code dummy
    });
  } catch (err) {
    console.error("Error saat memproses pembayaran:", err);
    res.status(500).json({
      message: "Terjadi kesalahan saat memproses pembayaran.",
      error: err.message,
    });
  }
};
// Menambahkan produk ke keranjang
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "ProductId dan quantity wajib diisi dan valid." });
    }

    const product = await Buket.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    // Cari item di keranjang untuk user saat ini
    const userId = req.user._id;
    const existingCartItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (existingCartItem) {
      // Update kuantitas dan total harga jika produk sudah ada di keranjang
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice = existingCartItem.quantity * product.price;
      await existingCartItem.save();
      return res.status(200).json({
        message: "Kuantitas produk berhasil diperbarui.",
        cartItem: existingCartItem,
      });
    }

    // Tambahkan item baru ke keranjang
    const newCartItem = new Cart({
      product: productId,
      quantity,
      totalPrice: product.price * quantity,
      user: userId,
    });
    await newCartItem.save();

    res.status(201).json({
      message: "Produk berhasil ditambahkan ke keranjang.",
      cartItem: newCartItem,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan.", error: error.message });
  }
};

// Mendapatkan semua item dalam keranjang
exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartItems = await Cart.find({ user: userId })
      .populate("product", "name price category image") // Ambil detail produk
      .exec();

    res.status(200).json({
      message: "Daftar item dalam keranjang.",
      cartItems,
    });
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

    const deletedItem = await Cart.findByIdAndDelete(cartItemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan." });
    }

    res.status(200).json({
      message: "Item berhasil dihapus dari keranjang.",
      deletedItem,
    });
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

    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity harus lebih besar dari 0." });
    }

    const cartItem = await Cart.findById(cartItemId).populate(
      "product",
      "price"
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Item tidak ditemukan." });
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.product.price * quantity;
    await cartItem.save();

    res.status(200).json({
      message: "Item berhasil diperbarui.",
      updatedItem: cartItem,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan.", error: error.message });
  }
};
