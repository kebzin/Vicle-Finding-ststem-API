const express = require("express");
const router = express.Router();

const {
  AddBank,
  DeleteBank,
  GetAllBank,
  GetBonus,
} = require("../controllers/Bank");
const verifyJWT = require("../middleware/verifyjwt");
router.use(verifyJWT);
router.get("/bank", GetAllBank);
router.get("/bonus", GetBonus);
router.post("/bank", AddBank);
router.delete("/bank/:id", DeleteBank);
// router.patch("/category/:id", updatecategory);

module.exports = router;
