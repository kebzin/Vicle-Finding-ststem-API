const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyjwt");
const upload = require("../middleware/imageUpoad");
const {
  getAllWanteds,
  getSingleWanted,
  updateWanted,
  CreatWanted,
  deleteWanted,
} = require("../controllers/Wanted"); // Make sure to import the correct controllers

router.use(verifyJWT);

router.put("/wanted/:id", updateWanted);
router.post("/wanted", CreatWanted);
router.get("/wanted", getAllWanteds);
router.get("/wanted/:id", getSingleWanted);
router.delete("/wanted/:id", deleteWanted);
router.post("/upload", upload.array("images", 10), async (req, res) => {
  // Here, 'image' is the field name from your form
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No images provided" });
  }
  // Handle the uploaded files
  const imagePaths = req.files.map((file) => file.filename);

  // Process or save the image paths, for example, store in a database
  res.status(200).json({ message: "Images uploaded successfully", imagePaths });
});

module.exports = router;
