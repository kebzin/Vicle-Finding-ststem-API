const express = require("express");
const router = express.Router();

const { AddBank, DeleteBank, GetAllBank } = require("../controllers/Bank");
const verifyJWT = require("../middleware/verifyjwt");
router.use(verifyJWT);
router.get("/bank", GetAllBank);
router.post("/bank", AddBank);
router.delete("/bank/:id", DeleteBank);
// router.patch("/category/:id", updatecategory);

module.exports = router;
