const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = multer.memoryStorage(); // Use memory storage for Cloudinary upload

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },

  fileFilter: (req, file, cb) => {
    // Accept image files only
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

module.exports = upload;
