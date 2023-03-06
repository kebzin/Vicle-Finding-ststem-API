const express = require("express");
const router = express.Router();

const {
  AddPricing,
  getAllPrices,
  deletePrice,
} = require("../controllers/Pricing");
const verifyJWT = require("../middleware/verifyjwt");
router.use(verifyJWT);
router.get("/prices", getAllPrices);
router.post("/prices", AddPricing);
router.delete("/prices/:id", deletePrice);

module.exports = router;
