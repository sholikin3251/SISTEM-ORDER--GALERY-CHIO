const Buket = require("../models/Buket");

// Get all bukets
exports.getAllBukets = async (req, res) => {
  try {
    const bukets = await Buket.find();
    res.status(200).json(bukets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get buket by ID
exports.getBuketById = async (req, res) => {
  const { id } = req.params;
  try {
    const buket = await Buket.findById(id);
    if (!buket) return res.status(404).json({ message: "Buket not found" });
    res.status(200).json(buket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new buket
exports.addBuket = async (req, res) => {
  try {
    const { name, category, price, description, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newBuket = new Buket({
      name,
      category,
      price,
      description,
      stock,
      image,
    });
    await newBuket.save();

    res.status(201).json(newBuket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update buket details (including image)
exports.updateBuket = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, category, price, description, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = { name, category, price, description, stock };
    if (image) updatedData.image = image;

    const updatedBuket = await Buket.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedBuket)
      return res.status(404).json({ message: "Buket not found" });

    res.status(200).json(updatedBuket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a buket
exports.deleteBuket = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBuket = await Buket.findByIdAndDelete(id);
    if (!deletedBuket)
      return res.status(404).json({ message: "Buket not found" });
    res.status(200).json({ message: "Buket deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update stock status
exports.updateStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const buket = await Buket.findByIdAndUpdate(id, { stock }, { new: true });
    if (!buket) return res.status(404).json({ message: "Buket not found" });
    res.status(200).json(buket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
