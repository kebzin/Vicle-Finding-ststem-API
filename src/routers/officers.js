const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyjwt");

// const multer = require("multer");
// const upload = multer({ dest: "../upload" }); // Specify the upload destination

// inporting function that will do the operation on the routh from the controller
const {
  getOffesers,
  getSingleOffeser,
  deleteOffeser,
  updateOffeser,
} = require("../controllers/officers");
const { CreatWanted } = require("../controllers/Wanted");

router.use(verifyJWT);
router.get("/officers", getOffesers);
router.get("/officers/:id", getSingleOffeser);
router.delete("/deleteOfficers/:id", deleteOffeser);
router.put("/officers/:id", updateOffeser);
router.post("/wanted/:id", CreatWanted);

module.exports = router;
