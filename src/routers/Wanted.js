const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyjwt");
const upload = require("../middleware/imageUpoad");
const { v2: cloudinary } = require("cloudinary");

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
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        try {
          const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream((cloudinaryError, result) => {
                if (cloudinaryError) {
                  console.error(
                    "Error uploading image to Cloudinary",
                    cloudinaryError.message
                  );
                  reject(cloudinaryError);
                } else {
                  resolve(result);
                }
              })
              .end(file.buffer);
          });

          return uploadResult.secure_url;
        } catch (uploadError) {
          console.error(
            "Error uploading image to Cloudinary",
            uploadError.message
          );
          throw uploadError;
        }
      })
    );

    // Process or save the Cloudinary image URLs, for example, store in a database

    // Send response to the client after all images are processed
    res.status(200).json({
      message: "Images uploaded successfully",
      uploadedImages: uploadedImages,
    });
  } catch (error) {
    console.error("Error processing images", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Export the router
module.exports = router;

module.exports = router;
