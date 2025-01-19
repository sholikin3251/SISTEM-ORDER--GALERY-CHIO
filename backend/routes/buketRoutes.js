const express = require("express");
const {
  getAllBukets,
  getBuketById,
  addBuket,
  updateBuket,
  deleteBuket,
  updateStock,
} = require("../controllers/buketController");
const upload = require("../middleware/upload");

const router = express.Router();

// Get all bukets
router.get("/", getAllBukets);

// Get buket by ID
router.get("/:id", getBuketById);

// Add a new buket with image
router.post("/", upload.single("image"), addBuket);

// Update buket details with image
router.put("/:id", upload.single("image"), updateBuket);

// Delete a buket
router.delete("/:id", deleteBuket);

// Update stock status
router.patch("/:id/stock", updateStock);

module.exports = router;
