const mongoose = require("mongoose");

const buketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["bunga", "snack", "boneka", "uang"],
    required: true,
  },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  stock: { type: Boolean, default: true },
});

module.exports = mongoose.model("Buket", buketSchema);
