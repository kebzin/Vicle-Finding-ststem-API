const express = require("express");
const router = express.Router();

const {
  registerOfficer,
  login,
  logout,
  refresh,
} = require("../controllers/Autentication");
// const verifyJWT = require("../middleware/verifyjwt");

// implementing the routh

router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);


router.post("/register", registerOfficer);
module.exports = router;
