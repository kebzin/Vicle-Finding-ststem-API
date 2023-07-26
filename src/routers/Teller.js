const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const verifyJWT = require("../middleware/verifyjwt");

const {
  GetTellers,
  getSingleOffeser,
  DeleteTeller,
  UpdateTeller,
  CreateTeller,
} = require("../controllers/Teller");

router.use(verifyJWT);
router.put("/teller/:id", UpdateTeller);
router.post("/teller", CreateTeller);
router.get("/teller", GetTellers);
router.get("/teller/:id", getSingleOffeser);
router.delete("/teller/:id", DeleteTeller);

module.exports = router;
