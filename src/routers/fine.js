const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const verifyJWT = require("../middleware/verifyjwt");

const {
  Fine,
  getAllFne,
  getAllFineMyFine,
  DeletingFine,
  GetSingleFine,
  updateFine,
  AddBonus,
  GetBonus,
  UpadteBunus,
} = require("../controllers/fine");

router.get("/single/:id", GetSingleFine);
router.put("/single/:id", updateFine);

router.use(verifyJWT);
router.post("/fine/:id", Fine);
router.get("/fine", getAllFne);
router.get("/fine/:id", getAllFineMyFine);
router.delete("/fine/:id", DeletingFine);

router.post("/bonus", AddBonus);
router.put("/bonus/:id", UpadteBunus);

module.exports = router;
