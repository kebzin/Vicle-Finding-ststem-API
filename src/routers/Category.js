const express = require("express");
const router = express.Router();

const {
  Addcategory,
  deletecategory,
  getAllcategory,
  updatecategory,
} = require("../controllers/Category");
const verifyJWT = require("../middleware/verifyjwt");
router.use(verifyJWT);
router.get("/category", getAllcategory);
router.post("/category", Addcategory);
router.delete("/category/:id", deletecategory);
router.patch("/category/:id", updatecategory);

module.exports = router;
