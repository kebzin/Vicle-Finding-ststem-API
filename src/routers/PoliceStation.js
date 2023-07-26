const express = require("express");
const router = express.Router();

const {
  AddPoliceStation,
  DeletePoliceStation,
  GetAllPoliceStation,
  UpadePoliceStation,
} = require("../controllers/PoliceStation");
const verifyJWT = require("../middleware/verifyjwt");
router.use(verifyJWT);
router.get("/station", GetAllPoliceStation);
router.post("/station", AddPoliceStation);
router.delete("/station/:id", DeletePoliceStation);
router.patch("/station/:id", UpadePoliceStation);

module.exports = router;
