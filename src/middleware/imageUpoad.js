const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../vench-finding-systeem/public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept image files only
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },

  fileFilter: fileFilter,
}); // Update to handle multiple files, with a max count of 5

module.exports = upload;
