const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buket",
    required: true,
  },
  quantity: { type: Number, default: 1, required: true },
  totalPrice: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Optional, jika ada autentikasi user
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", cartSchema);
