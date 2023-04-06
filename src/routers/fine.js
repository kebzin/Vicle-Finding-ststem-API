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
} = require("../controllers/fine");

router.get("/single/:id", GetSingleFine);
router.use(verifyJWT);
router.post("/fine/:id", Fine);
router.get("/fine", getAllFne);
router.get("/fine/:id", getAllFineMyFine);
router.delete("/fine/:id", DeletingFine);

module.exports = router;
