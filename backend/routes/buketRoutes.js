const express = require("express");
const {
  getAllBukets,
  getBuketById,
  addBuket,
  updateBuket,
  deleteBuket,
  updateStock,
} = require("../controllers/buketController");
const { upload, handleMulterError } = require("../middleware/upload");

const router = express.Router();

// Route: Get all bukets
router.get("/", async (req, res) => {
  try {
    await getAllBukets(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Get a buket by ID
router.get("/:id", async (req, res) => {
  try {
    await getBuketById(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Add a new buket with image upload
router.post(
  "/",
  upload.single("image"),
  handleMulterError,
  async (req, res) => {
    try {
      await addBuket(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Route: Update buket details with image upload
router.put(
  "/:id",
  upload.single("image"),
  handleMulterError,
  async (req, res) => {
    try {
      await updateBuket(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Route: Delete a buket
router.delete("/:id", async (req, res) => {
  try {
    await deleteBuket(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Update stock status
router.patch("/:id/stock", async (req, res) => {
  try {
    await updateStock(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
