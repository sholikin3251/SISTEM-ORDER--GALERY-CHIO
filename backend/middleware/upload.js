const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Membuat folder "uploads" jika belum ada
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Direktori penyimpanan file
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedFilename = file.originalname.replace(/\s+/g, "-"); // Menghilangkan spasi
    cb(null, `${timestamp}-${sanitizedFilename}`); // Penamaan file unik
  },
});

// Filter tipe file (hanya gambar)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, JPG, and WEBP are allowed.")
    );
  }
};

// Middleware Multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal ukuran file 5MB
  fileFilter,
});

// Middleware untuk menangani error Multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Error dari Multer (e.g., file terlalu besar)
    res.status(400).json({ error: err.message });
  } else if (err) {
    // Error lainnya (e.g., tipe file tidak valid)
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
};

module.exports = { upload, handleMulterError };
